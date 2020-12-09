const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.todoSchema = Joi.object({
    task: Joi.object({
        name: Joi.string().required().escapeHTML(),
        note: Joi.string().default(' ').escapeHTML(),
        group: Joi.string().escapeHTML(),
        date: Joi.string().min(10).max(10).required().escapeHTML(),
    }).required()
})

module.exports.querySchemaD = Joi.object({
    d: Joi.string().required().valid('today', 'week').escapeHTML()
})
module.exports.querySchemaG = Joi.object({
    g: Joi.string().required().valid('personal', 'work', 'other').escapeHTML()
})