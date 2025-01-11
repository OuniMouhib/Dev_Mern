const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    heure_depart: { type: String, required: true },
    heure_arrivee: { type: String, required: true },
    conducteur: { type: String, required: true },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
    destination: { type: String, required: true },
    distance:{type:Number,required:true}
});

const Mission = mongoose.model('missions', missionSchema);
module.exports = Mission;
