const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Animal extends Model {
  // static upvote(body, models) {
  //   return models.Vote.create({
  //     user_id: body.user_id,
  //     post_id: body.post_id
  //   }).then(() => {
  //     return Post.findOne({
  //       where: {
  //         id: body.post_id
  //       },
  //       attributes: [
  //         'id',
  //         'post_url',
  //         'title',
  //         'created_at',
  //         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  //       ],
  //       include: [
  //         {
  //           model: models.Comment,
  //           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  //           include: {
  //             model: models.User,
  //             attributes: ['username']
  //           }
  //         }
  //       ]
  //     });
  //   });
  // }
}

// create fields/columns for Post model
Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: 'No Name'
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['dog', 'cat', 'rabbit', 'small pet']]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    special_needs: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 0
  },
  foster_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'foster',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'animal'
  }
);

module.exports = Animal;
