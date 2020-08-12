const express = require('express')
const mongoose = require('mongoose')
const referral = require('./models/referrals')
const app = express()

//database connection start
mongoose.connect('mongodb://localhost/referrals', {
    useNewUrlParser:true, useUnifiedTopology:true
})
// database connection end 

// specifying view folder and view root file; PS: adjust this to the view you're using for this module
app.set('view engine', 'ejs')

// This allows us to parse the referral code to the current user
app.use(express.urlencoded({extended: false}))

// Logic to display data from database
app.get('/', async (req, res) => {
    const referrals = await referral.find()
    res.render('index', {referrals: referrals}
    )
})


// Logic to to send data to database
// I have used asynchronous method here to wait for the action to be done before it's displayed you can modify.
app.post('/refer', async (req, res) => {
    await referral.create({username: req.body.uname})

    res.redirect('/')
})

// Logic for referrer code view tied to specific user reffered
app.get('/:referrer', async (req, res) => {
    const referrer = await referral.findOne({referralLink: req.params.referrer})

    // Checking to be sure that link is actually link and it's correct.
    if (referrer == null) return res.sendStatus(404)

    // Parses username to the url for specific user
    res.redirect(referrer.username)
}) 

// Modify to adjust to your server settings
app.listen(process.env.PORT || 5000);