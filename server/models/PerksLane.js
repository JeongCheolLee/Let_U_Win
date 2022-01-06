const mongoose = require('mongoose');

const perksTopSchema = mongoose.Schema({});
const PerksTop = mongoose.model('PerksTop', perksTopSchema, 'perksTop');

const perksJungleSchema = mongoose.Schema({});
const PerksJungle = mongoose.model(
    'PerksJungle',
    perksJungleSchema,
    'perksJungle'
);

const perksMiddleSchema = mongoose.Schema({});
const PerksMiddle = mongoose.model('PerksMid', perksMiddleSchema, 'perksMid');

const perksBottomSchema = mongoose.Schema({});
const PerksBottom = mongoose.model('PerksBot', perksBottomSchema, 'perksBot');

const perksUtilitySchema = mongoose.Schema({});
const PerksUtility = mongoose.model('PerksSup', perksUtilitySchema, 'perksSup');

module.exports = {
    PerksTop,
    PerksJungle,
    PerksMiddle,
    PerksBottom,
    PerksUtility,
};
