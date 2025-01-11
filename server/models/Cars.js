const mongoose= require('mongoose')
const CarSchema = new mongoose.Schema({
    Marque: String ,
    Modéle: String,
    Puissance: Number,
    Numéro_de_série: Number,
    Image: String,
    Disponibilité: { type: Boolean, default: false } // Stocke la disponibilité comme un booléen
});

const CarModel = mongoose.model("cars",CarSchema)
module.exports = CarModel