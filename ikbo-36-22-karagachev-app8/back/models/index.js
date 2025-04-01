const User = require('./user');
const Project = require('./project');

Project.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Project, { foreignKey: 'userId' });

module.exports = {
    User,
    Project
}; 