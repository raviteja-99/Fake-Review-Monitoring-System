const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const natural = require('natural');
const requestIp = require('request-ip');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key';

// Initialize NLP analyzer
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());
app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/checkoutDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model('User', userSchema);

// Define Order schema and model
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String, required: true },
    reviews: [{
        reviewText: String,
        sentiment: String,
        sentimentScore: Number,
        ipAddress: String,
    }],
});
const Order = mongoose.model('Order', orderSchema);

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error registering user: ' + err.message });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error logging in: ' + err.message });
    }
});

// API endpoint to get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching orders: ' + err.message });
    }
});

// API endpoint to submit a review (Enhanced Detection)
app.post('/api/reviews', async (req, res) => {
    const { orderId, reviewText } = req.body;
    const ipAddress = req.clientIp;

    try {
        // NLP Analysis
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(reviewText);
        const sentimentScore = analyzer.getSentiment(tokens);
        
        let sentimentLabel = 'Real';
        const lowerReview = reviewText.toLowerCase();

        // Define spammy words
        const overlyPositiveWords = ['miracle', 'mindblowing', 'magic', 'sunshine', 'fantastic', 'incredible', 'bless to have', 'never seen before', 'best ever', 'life changing'];
        const overlyNegativeWords = ['scam', 'nightmare', 'poison', 'horrible', 'disaster', 'dreadful', 'garbage', 'worst purchase', 'avoid at all costs', 'useless', 'ripoff', 'fake'];

        // Check for overly positive/negative using spammy words
        const positiveMatches = lowerReview.match(new RegExp(overlyPositiveWords.join('|'), 'g')) || [];
        const isOverlyPositive = positiveMatches.length >= 3;

        const negativeMatches = lowerReview.match(new RegExp(overlyNegativeWords.join('|'), 'g')) || [];
        const isOverlyNegative = negativeMatches.length >= 3;

        // Check for other spam indicators
        const excessivePunctuation = /(!|\?){3,}/.test(reviewText);
        const allCaps = (reviewText.match(/[A-Z]/g) || []).length > reviewText.length * 0.5;

        // Determine if review is fake
        if (isOverlyPositive || isOverlyNegative) {
            sentimentLabel = 'Fake';
        }

        if (excessivePunctuation || allCaps) {
            sentimentLabel = 'Fake';
        }

        // Skip neutral reviews
        if (sentimentScore === 0) {
            return res.json({ success: false, message: 'Neutral reviews are not stored' });
        }

        // Check if order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Prevent duplicate reviews from the same IP
        const existingReview = order.reviews.find(r => r.ipAddress === ipAddress);
        if (existingReview) {
            return res.json({ success: false, message: 'Same user wrote a review again' });
        }

        // Save the review
        order.reviews.push({ 
            reviewText, 
            sentiment: sentimentLabel, 
            sentimentScore: sentimentScore, 
            ipAddress 
        });
        await order.save();

        res.json({ 
            success: true, 
            message: 'Review submitted successfully!', 
            sentiment: sentimentLabel, 
            sentimentScore: sentimentScore, 
            ipAddress 
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error submitting review: ' + err.message });
    }
});
// Checkout API
app.post('/api/checkout', async (req, res) => {
    try {
        const { name, email, address, productName, productPrice, productImage } = req.body;
        if (!name || !email || !address || !productName || !productPrice || !productImage) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const newOrder = new Order({ name, email, address, productName, productPrice, productImage, reviews: [] });
        await newOrder.save();
        res.json({ success: true, message: 'Checkout successful', orderId: newOrder._id });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error processing checkout: ' + err.message });
    }
});

// Client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});