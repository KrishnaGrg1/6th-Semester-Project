const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCharge(amount, currency, source) {
    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source
        });
        return charge;
    } catch (error) {
        throw new Error('Payment failed');
    }
}

module.exports = { createCharge };