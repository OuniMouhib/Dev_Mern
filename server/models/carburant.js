const mongoose = require('mongoose');

// Définir le schéma de carburant
const carburantSchema = new mongoose.Schema({
    quantite: {
        type: Number,
        required: true
    },
    cout: {
        type: Number,
        required: true
    },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
    date: {
        type: Date,
        default: Date.now
    }
});

// Créer le modèle Carburant à partir du schéma
const Carburant = mongoose.model("carburants", carburantSchema);

// Exporter le modèle Carburant
module.exports = Carburant;
