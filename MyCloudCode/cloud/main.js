// Use Parse.Cloud.define to define as many cloud functions as you want.
//create new user
Parse.Cloud.define("newUserSignUp", function(request, response){
    var user = new Parse.User();
    
    user.set("username", request.param.username);
    user.set("password", request.param.password);
    user.set("email", request.param.email);
    user.set("tagLine", request.param.tagLine);
    user.set("authorName", request.param.username);
    user.set("accountSettings", request.param.accountSettings);
    user.set("profilePic", request.param.profilePic);
    user.set("createdAt", Date.now);
    user.set("updatedAt", Date.now);
    
    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
});

//create new post
Parse.Cloud.define("createNewPost", function(request, response){
    var post = new Parse.Post();
    var user = Parse.User.current();
    
    post.set("Title", request.param.title);
    post.set("subtitle", request.param.subtitle);
    post.set("coverImg", request.param.coverImg);
    post.set("creator", user);
    post.set("createdAt", Date.now);
    post.set("updatedAt", Date.now);
    post.set("tags", request.param.tags);
    post.set("prompt", request.param.prompt);
    post.set("wordCount", request.param.wordCount);
    post.set("charCount", request.param.charCount);
    post.set("textContent", request.param.textContent);
    
    post.save(null, {
        success: function(post) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + post.id);
        },
        error: function(post, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
});

//create new Prompt
Parse.Cloud.define("createNewPrompt", function(request, response){
    var prompt = new Parse.Prompt();
    
    prompt.set("promptContent", request.param.content);
    prompt.set("type", request.param.type);
    prompt.set("createdAt", Date.now);
    prompt.set("updatedAt", Date.now);
    prompt.save(null, {
        success: function(prompt) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + prompt.id);
        },
        error: function(prompt, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
});

//retrieve user with specific objectId
Parse.Cloud.define("getUserWithID", function(request,response){
    var user = new Parse.User();
    var query = new Parse.Query(user);
    query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no User found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//retrieve specifi post by objectId
Parse.Cloud.define("getPostWithID", function(request,response){
    var post = new Parse.Post();
    var query = new Parse.Query(post);
    query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Post found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//retrieve specific post by objectId
Parse.Cloud.define("getPromptWithID", function(request,response){
    var prompt = new Parse.Prompt();
    var query = new Parse.Query(prompt);
    query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Prompt found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//retrieve array of post that contain the tag specified
Parse.Cloud.define("retrievePostsWithTag", function(request,response){
    var post = new Parse.Post();
    var query = new Parse.Query(post);
    query.equalTo("tags", request.param.tag);
    query.find({
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Post found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//retrieve aray of prompts with specified tag
Parse.Cloud.define("retrievePromptsWithTag", function(request,response){
    var prompt = new Parse.Prompt();
    var query = new Parse.Query(prompt);
    query.equalTo("tags", request.param.tag);
    query.find( {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Prompt found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//search for Users by Name
Parse.Cloud.define("searchUsersbyName", function(request,response){
    var user = new Parse.User();
    
    var query1 = new Parse.Query(user);
    var query2 = new Parse.Query(user);
    var query3 = new Parse.Query(user);
    query1.contains("username", request.param.name);
    query2.contains("authorName", request.param.name);
    query3.contains("name", request.param.name);
    
    var query = new Parse.Query.or(query1,query2, query3);
    query.find({
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Post found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//search for posts by Creator
Parse.Cloud.define("searchPostsbyCreator", function(request,response){
    var post = new Parse.Post();
    
    var query1 = new Parse.Query(post);
    var query2 = new Parse.Query(post);
    query1.contains("username", request.param.name);
    query2.contains("authorNameDisplayed", request.param.name)
    
    var query = new Parse.Query.or(query1,query2);
    query.find({
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Post found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//get array of followers of given user
Parse.Cloud.define("getFollowers", function(request, response){
    var user = new Parse.User.current();
    var relation = user.relation("followers");
    relation.query().find({
    success: function(list) {
        // list contains the followers of the current user
        response.success(list);
        }
    });
});

//get array of users that given user is following
Parse.Cloud.define("getFollowing", function(request, response){
    var user = new Parse.User.current();
    
    var relation = user.relation("following");
    relation.query().find({
        success: function(list){
            response.success(list);
        }
    });
});

//get array of posts written by author name
Parse.Cloud.define("getPostsbyUser", function(request, response){
    var post = new Parse.Post();
    var query = new Parse.Query(post);
    
    query.equalTo("displayedAuthorName", request.param.author);
    
    query.find({
       success: function(results){
           response.success(results);
       },
        error: function(object, error) { 
            response.error("error in search");
        }
    });
});

//edit Posts
Parse.Cloud.define("editPost", function(request, response){
    var post = new Parse.Post();
    var query = new Parse.Query(post);
    var _post = query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Post found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
    
    _post.set("Title", request.param.title);
    _post.set("subtitle", request.param.subtitle);
    _post.set("coverImg", request.param.coverImg);
    _post.set("updatedAt", Date.now);
    _post.set("tags", request.param.tags);
    _post.set("wordCount", request.param.wordCount);
    _post.set("charCount", request.param.charCount);
    _post.set("textContent", request.param.textContent);
    
    _post.save(null, {
        success: function(post) {
            // Execute any logic that should take place after the object is saved.
            alert('Upated object with objectId: ' + post.id);
        },
        error: function(post, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to update object, with error code: ' + error.message);
        }
    });
});

//edit user attributes
Parse.Cloud.define("editUserAttributes", function(request, response){
    var user = new Parse.User();
    var query = new Parse.Query(user);
    var _user = query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no User found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
    
    _user.set("password", request.param.password);
    _user.set("email", request.param.email);
    _user.set("tagLine", request.param.tagLine);
    _user.set("authorName", request.param.username);
    _user.set("accountSettings", request.param.accountSettings);
    _user.set("profilePic", request.param.profilePic);
    _user.set("updatedAt", Date.now);
    
    _user.save(null, {
        success: function(user) {
            // Execute any logic that should take place after the object is saved.
            alert('Upated object with objectId: ' + user.id);
        },
        error: function(user, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to update object, with error code: ' + error.message);
        }
    });
});

//edit User settings
Parse.Cloud.define("editUserSetting", function(request, response){
    var user = new Parse.User();
    var query = new Parse.Query(user);
    var _user = query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no User found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
    _user.set("accountSettings", request.param.accountSettings);
    
    _user.save(null, {
        success: function(user) {
            // Execute any logic that should take place after the object is saved.
            alert('Upated object with objectId: ' + user.id);
        },
        error: function(user, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to update object, with error code: ' + error.message);
        }
    });
});

//delete a user
Parse.Cloud.define("deleteUser", function(request, response){
    var user = new Parse.User.current();
    user.destroy({
        success: function(_user) {
            // The object was deleted from the Parse Cloud.
        },
        error: function(_user, error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//delete a post
Parse.Cloud.define("deletePost", function(request, response){
    var post = new Parse.Post();
    var query = new Parse.Query(post);
    var _post = query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Post found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
    
    _post.destroy({
        success: function(_post) {
            // The object was deleted from the Parse Cloud.
        },
        error: function(_post, error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//delete a prompt
Parse.Cloud.define("deletePrompt", function(request, response){
    var prompt = new Parse.Prompt();
    var query = new Parse.Query(prompt);
    var _prompt = query.get(request.param.objectId, {
        success: function(results) {
            response.success(results);
            // The object was retrieved successfully.
        },
        error: function(object, error) {
            response.error("no Prompt found");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
    
    _prompt.destroy({
        success: function(_prompt) {
            // The object was deleted from the Parse Cloud.
        },
        error: function(_prompt, error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
        }
    });
});

//user login
Parse.Cloud.define("loginUser", function(request, response){
    Parse.User.logIn(request.param.username, request.param.password, {
        success: function(user) {
            // Do stuff after successful login.
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
        }
    });
});

//user logout
Parse.Cloud.define("logoutUser", function(request, response){
    Parse.User.logOut();
});

//follow a user
Parse.Cloud.define("followUser", function(request, response){
    var currentUser = Parse.User.curent();
    var toFollow = getUserByID(request.param.toFollow);
    
    currentUser.relation("following").add(toFollow);
    toFollow.relation("followers").add(currentUser);
    
    currentUser.save();
    toFollow.save();
});

//unfollow a user
Parse.Cloud.define("followUser", function(request, response){
    var currentUser = Parse.User.curent();
    var followed = getUserByID(request.param.toRemove);
    
    currentUser.relation("following").remove(followed);
    followed.relation("followers").remove(currentUser);
    
    currentUser.save();
    followed.save();
});