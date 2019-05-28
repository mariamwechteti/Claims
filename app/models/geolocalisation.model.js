const mongoose = require('mongoose');
 
const GeolocationSchema = mongoose.Schema({
    
    name: {
        type: String,
        default: '',
        trim: true
    },
    loc: {
        'type': {
            type: String,
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
        default: 'Point'
        },
        coordinates: { type: Array, default: [0.0, 0.0] }
    }
  
});
 
module.exports = mongoose.model('Geolocation', GeolocationSchema);