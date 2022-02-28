const sql = require('./db.js');

const Profile = function(user){
    this.id = user.id;
    this.nickname = user.nickname;
    this.avatar = user.avatar;
    this.joined = user.joined;
    this.posts = user.posts;
    this.games = user.games;
}

Profile.findByID = (id, result) => {
    user((id), (err, data) => {
        if(err) {
            result(err, null);
            return;
        } else if (data[0] == null){
            result(null, null);
            return;
        }
        games((id), (error, dataGames) => {
            if(error) {
                dataGames = [];
            }
            posts((id), (errorPost, dataPost) => {
                if(errorPost) {
                    dataPost = [];
                }
                var profile = new Profile({
                    id: data[0].id,
                    nickname: data[0].nickname,
                    avatar: data[0].avatar,
                    joined: data[0].joined,
                    games: dataGames,
                    posts: dataPost
                });

                result(null, profile);
            });
        });
    })
}

function user(id, callback){
    sql.query("SELECT id, nickname, avatar, created_at as joined FROM user WHERE id = ?", [id], (err, res) => {
        if(err){
            console.log("error: ", err);
            callback(err, null);
            return;
        }
        /*{id: res.id, nickname: res.nickname, avatar: res.avatar, joined: res.created_at}*/
        callback(null, res);
    });
}

function games(id, callback){
    sql.query(
        "SELECT game.id as id, game.title as title, game.description as description "
        + " FROM game_list list INNER JOIN game ON list.game_id=game.id "
        + " WHERE user_id = ?;", [id], (err, res) => {
        if(err){
            console.log("error: ", err);
            callback(err, null);
            return;
        }
        
        callback(null, res);
    });
}

function posts(id, callback){
    sql.query(
        "SELECT id, title, created_at, updated_at, if(comments.TOTAL IS NULL, 0, comments.TOTAL) AS total_comments "
        + " FROM post LEFT JOIN (SELECT post_id, COUNT(*) as TOTAL FROM post_comment "
        + " GROUP BY post_id) comments ON post.id=comments.post_id WHERE user_id = ?;", [id], (err, res) => {
        if(err){
            console.log("error: ", err);
            callback(err, null);
            return;
        }
        
        callback(null, res);
    });
}
module.exports = Profile;