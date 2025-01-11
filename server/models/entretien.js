const mongoose = require('mongoose');

const EntretienSchema = new mongoose.Schema({
    reparationService: String,
    cout: Number,
    delai: String,
    voiture: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' }
});

const EntretienModel = mongoose.model("entretien", EntretienSchema);

module.exports = EntretienModel;
