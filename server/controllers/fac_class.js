const Faculty = require('../models/faculty');
const Classroom = require('../models/classroom');
const Post = require('../models/post');
const deleteFiles = require('../utility/deleteFiles');

const mongoose = require('mongoose');

// fetch the list of all the classrooms created by the user

exports.getAllClassrooms = (req, res, next) => {

    // extract relevant data from the request object

    let fac_id = req.fac._id;
    
    Classroom.find({faculty: fac_id}).populate('batch').populate('faculty').then(classrooms => {

        // send response for the request
        
        res.status(200).json(classrooms);
    }).catch(err => {
        let error = new Error('Could not process request!')
        error.status(500);
        next(error);
    });
};

// fetch the list of all the "active" or "inactive" classrooms created by the user

exports.getClassroomsByStatus = (req, res, next) => {

    // extract relevant data from the request object

    let fac_id = req.fac._id;
    let status = req.params.status;

    Classroom.find({faculty: fac_id, status: status}).populate('batch').populate('faculty').then(classrooms => {

        // send response for the request
        
        res.status(200).json(classrooms);
    }).catch(err => {
        let error = new Error('Could not process request!')
        error.status(500);
        next(error);
    });
};

// create a new classroom with the currently logged in faculty member as its owner

exports.createClassroom = (req, res, next) => {
    try{
        
    // extract relevant data from the request object

        const fac_id = req.fac._id;
        const info = req.body;

        // parsing information about the classroom into an object

        const fields = ['batch', 'faculty', 'subject', 'meet_link', 'alternate_link', 'status'];
        const classroom_info = {};
        for(let k of fields){
            classroom_info[k] = info[k];
        }
        classroom_info.faculty = fac_id;

        // creating new classroom from parsed information

        let classroom = new Classroom(classroom_info);

        // saving the newly created classroom

        classroom.save().then(classrooms => {

            // send response for the request
            
            res.status(200).json({message: 'Classroom created successfully!'});
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not create the classroom!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// fetch the information about a specific classroom created by the user based on classroom id

exports.getClassroomInfoById = (req, res, next) => {

    // extract relevant data from the request object

    let fac_id = req.fac._id;
    let class_id = req.params.class_id;

    // query database for classroom with given id

    Classroom.findById(class_id).populate('batch').populate('faculty').then(classroom => {

        // check if the classroom with given id exists or not

        if(!classroom){
            let error = new Error('Classroom does not exist.');
            error.status = 404;
            throw error;
        }

        // check if the currently logged in user created the classroom

        else if(classroom.faculty._id.toString() !== fac_id.toString()){
            let error = new Error('Unauthorized access.');
            error.status = 401;
            throw error;
        }

        // if above checks pass then return the classroom information

        else{

            // send response for the request
            
            return res.status(200).json(classroom);
        }
    }).catch(err => {
        if(!err.status){
            let error = new Error('Could not fetch the classroom information!');
            error.status = 500;
            return next(error);
        }
        next(error);
    });
};

// delete a classroom created by the user

exports.deleteClassroomById = (req, res, next) => {
    
    // extract relevant data from the request object

    let fac_id = req.fac._id;
    let class_id = req.params.class_id;

    // query the database for the classroom with given id

    Classroom.findById(class_id).then(classroom => {

        // check if the classroom with given id exists or not

        if(!classroom){
            let error = new Error('Classroom does not exist.');
            error.status = 404;
            throw error;
        }

        // check if the currently logged in user created the classroom

        else if(classroom.faculty.toString() !== fac_id.toString()){
            console.log(classroom.faculty.toString(),fac_id)
            let error = new Error('Unauthorized access.');
            error.status = 401;
            throw error;
        }

        // if above checks pass then deactivate the classroom

        else{
            Classroom.findByIdAndDelete(class_id).then(result => {

                // send response for the request
        
                res.status(200).json({message: 'Classroom removed successfully!'});
            }).catch(err => {
                throw err;
            });
        }
    }).catch(err => {
        if(!err.status){
            let error = new Error('Could not remove the classroom!');
            error.status = 500;
            return next(error);
        }
        next(err);
    });
};

// deactivate a classroom created by the user

exports.deactivateClassroomById = (req, res, next) => {
    
    // extract relevant data from the request object

    let fac_id = req.fac._id;
    let class_id = req.params.class_id;

    // query the database for the classroom with given id

    Classroom.findById(class_id).then(classroom => {

        // check if the classroom with given id exists or not

        if(!classroom){
            let error = new Error('Classroom does not exist.');
            error.status = 404;
            throw error;
        }

        // check if the currently logged in user created the classroom

        else if(classroom.faculty.toString() !== fac_id.toString()){
            console.log(classroom.faculty.toString(),fac_id)
            let error = new Error('Unauthorized access.');
            error.status = 401;
            throw error;
        }

        // if above checks pass then deactivate the classroom

        else{
            classroom.status = 'inactive';
            classroom.save().then(result => {

                // send response for the request
        
                res.status(200).json({message: 'Classroom deactivated successfully!'});
            }).catch(err => {
                throw err;
            });
        }
    }).catch(err => {
        if(!err.status){
            let error = new Error('Could not deactivate the classroom!');
            error.status = 500;
            return next(error);
        }
        next(err);
    });
};

// activate a classroom created by the user

exports.activateClassroomById = (req, res, next) => {
    
    // extract relevant data from the request object

    let fac_id = req.fac._id;
    let class_id = req.params.class_id;

    // query the database for the classroom with given id

    Classroom.findById(class_id).then(classroom => {

        // check if the classroom with given id exists or not

        if(!classroom){
            let error = new Error('Classroom does not exist.');
            error.status = 404;
            throw error;
        }

        // check if the currently logged in user created the classroom

        else if(classroom.faculty.toString() !== fac_id.toString()){
            console.log(classroom.faculty.toString(),fac_id)
            let error = new Error('Unauthorized access.');
            error.status = 401;
            throw error;
        }

        // if above checks pass then activate the classroom

        else{
            classroom.status = 'active';
            classroom.save().then(result => {

                // send response for the request
        
                res.status(200).json({message: 'Classroom activated successfully!'});
            }).catch(err => {
                throw err;
            });
        }
    }).catch(err => {
        if(!err.status){
            let error = new Error('Could not activate the classroom!');
            error.status = 500;
            return next(error);
        }
        next(err);
    });
};

// update information for a classroom created by the user

exports.updateClassroomInfoById = (req, res, next) => {
    try{
    
        // extract relevant data from the request object

        let fac_id = req.fac._id;
        let class_id = req.params.class_id;
        const classroom_info = req.body;

        // parsing updated information about the classroom into an object

        const info = ['batch','subject', 'meet_link', 'alternate_link'];
        const updated_info = {};
        for(let k of info){
            updated_info[k] = classroom_info[k];
        }


        // query the database for the classroom with given id

        Classroom.findById(class_id).then(classroom => {

            // check if the classroom with given id exists or not
    
            if(!classroom){
                let error = new Error('Classroom does not exist.');
                error.status = 404;
                throw error;
            }
            
            // check if the currently logged in user created the classroom

            else if(classroom.faculty.toString() !== fac_id.toString()){
                let error = new Error('Unauthorized access.');
                error.status = 401;
                throw error;
            }

            // if above checks pass then update the classroom information

            else{

                // update classroom information to the model

                for(let k in updated_info){
                    classroom[k] = updated_info[k] || classroom[k];
                }

                // save the updated classroom

                classroom.save().then(result => {

                    // send response for the request
        
                    res.status(200).json({message: 'Classroom updated successfully!'});
                }).catch(err => {
                    throw error;
                });
            }
        }).catch(err => {
            throw error;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not update the classroom!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// fetch posts belonging to a classroom created by the user

exports.getClassroomPosts = (req, res, next) => {

    // extract relevant data from the request object

    let fac_id = req.fac._id;
    let class_id = req.params.class_id;

    // query the database for the classroom with given id
    
    Classroom.findById(class_id).then(classroom => {

        // check if the classroom with given id exists or not

        if(!classroom){
            let error = new Error('Classroom does not exist.');
            error.status = 404;
            throw error;
        }

        // check if the currently logged in user created the classroom

        else if(classroom.faculty.toString() !== fac_id.toString()){
            let error = new Error('Unauthorized access.');
            error.status = 401;
            throw error;
        }

        // if above checks pass then fetch the posts

        else{

            // query database for the posts

            return Post.aggregate([
                {
                    $match: {
                        classroom: classroom._id
                    }
                },
                {
                    $addFields: {
                        totalComments: {
                            $size: '$comments'
                        }
                    }
                },
                {
                    $project: {
                        comments: 0
                    }
                }
            ]);
        }
    }).then(posts => {

        // send response for the request

        res.status(200).json(posts);
    }).catch(err => {
        if(!err.status){
            let error = new Error('Could not fetch the posts!');
            error.status = 500;
            return next(error);
        }
        next(err);
    });
};

// create a post in a classroom created by the user

exports.createClassroomPost = (req, res, next) => {
    try{

        // extract relevant data from the request object
    
        let fac_id = req.fac._id;
        let class_id = req.params.class_id;
        const post_info = req.body;

        // parsing information about the post content into an object

        const content_fields = ['title','subtitle', 'info'];
        const content = {};
        for(let k of content_fields){
            content[k] = post_info[k];
        }

        // parsing file data for the post

        const files = [];
        for(let f of req.files){
            files.push({
                filename: f.originalname,
                url: f.path
            });
        };

        // prepare the data for the new post

        const new_post = {
            content: content,
            classroom: class_id,
            files: files
        }

        // query the database for the classroom with given id
    
        Classroom.findById(class_id).then(classroom => {

            // check if the classroom with given id exists or not
    
            if(!classroom){
                let error = new Error('Classroom does not exist.');
                error.status = 404;
                throw error;
            }
    
            // check if the currently logged in user created the classroom
    
            else if(classroom.faculty.toString() !== fac_id.toString()){
                let error = new Error('Unauthorized access.');
                error.status = 401;
                throw error;
            }
    
            // if above checks pass then create new post
    
            else{

                // create new post

                let post = new Post(new_post);

                // save the newly created post

                post.save().then(result => {

                    // send response for the request
        
                    res.status(200).json({message: "Post created successfully!"});
                }).catch(err => {
                    throw err;
                });
            }
        }).catch(err => {
            throw err;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not create the post!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// update post in a classroom created by the user

exports.updatePostById = (req, res, next) => {
    try{

        // extract relevant data from the request object

        let fac_id = req.fac._id;
        let class_id = req.params.class_id;
        let post_id = req.params.post_id;
        const post_info = req.body;

        // parsing information about the post content into an object

        const content_fields = ['title','subtitle', 'info'];
        const updated_content = {};
        for(let k of content_fields){
            updated_content[k] = post_info[k];
        }

        // query the database for the classroom with given id
        

        Classroom.findById(class_id).then(classroom => {

            // check if the classroom with given id exists or not
    
            if(!classroom){
                let error = new Error('Classroom does not exist.');
                error.status = 404;
                throw error;
            }
    
            // check if the currently logged in user created the classroom
    
            else if(classroom.faculty.toString() !== fac_id.toString()){
                let error = new Error('Unauthorized access.');
                error.status = 401;
                throw error;
            }
    
            // if above checks pass then proceed to update the post
    
            else{

                // query database for the post with given id

                Post.findById(post_id).then(post => {

                    // check if the post with given id exists

                    if(!post){
                        let error = new Error('Post does not exist.');
                        error.status = 404;
                        throw error;
                    }

                    // if the post exists update the post

                    else{

                        // update the content on the post based on the parsed data from body

                        for(let field in updated_content){
                            post.content[field] = updated_content[field] || post.content[field];
                        }

                        // save the updated post

                        post.save().then(result => {

                            // send response for the request
                
                            res.status(200).json({message: "Post updated successfully!"});
                        }).catch(err => {
                            throw err;
                        });
                    }
                }).catch(err => {
                    throw err;
                })
            }
        }).catch(err => {
            throw err;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not update the post!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// delete post from a classroom created by the user

exports.deletePostById = (req, res, next) => {
    try{

        // extract relevant data from the request object

        let fac_id = req.fac._id;
        let class_id = req.params.class_id;
        let post_id = req.params.post_id;

        Classroom.findById(class_id).then(classroom => {

            // check if the classroom with given id exists or not
    
            if(!classroom){
                let error = new Error('Classroom does not exist.');
                error.status = 404;
                throw error;
            }
    
            // check if the currently logged in user created the classroom
    
            else if(classroom.faculty.toString() !== fac_id.toString()){
                let error = new Error('Unauthorized access.');
                error.status = 401;
                throw error;
            }
    
            // if above checks pass then proceed to delete the post
    
            else{

                // query the database for the post with given id

                Post.findById(post_id).then(post => {

                    // check if the post with given id exists or not
    
                    if(!post){
                        let error = new Error('Post does not exist!');
                        error.status = 404;
                        throw error;
                    }

                    // if the post exists delete the post

                    else{

                        // parse the post related files into an array for removal from the system

                        let files = post.files.map(file => {
                            return file.url;
                        });

                        // delete the files

                        deleteFiles(files);

                        // delete the post

                        Post.findByIdAndDelete(post_id).then(result => {

                            // send response for the request

                            res.status(200).json({message: "Post deleted successfully!"});
                        }).catch(err => {
                            throw err;
                        });
                    }
                }).catch(err => {
                    throw err;
                });
            }
        }).catch(err => {
            throw err;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not delete the post!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// comment on a post in a classroom created by the user

exports.postComment = (req, res, next) => {
    try{

        // extract relevant data from the request object

        let fac_id = req.fac._id;
        let class_id = req.params.class_id;
        let post_id = req.params.post_id;
        let comment_info = req.body;
        

        const fac_info = req.fac.personal_info;

        let author = fac_info.first_name + (fac_info.last_name ? (' ' + fac_info.last_name) : '');

        // parsing comment data into an object
        
        const comment_data = {
            comment: comment_info.comment,
            author: author
        };

        Classroom.findById(class_id).then(classroom => {

            // check if the classroom with given id exists or not
    
            if(!classroom){
                let error = new Error('Classroom does not exist.');
                error.status = 404;
                throw error;
            }
    
            // check if the currently logged in user created the classroom
    
            else if(classroom.faculty.toString() !== fac_id.toString()){
                let error = new Error('Unauthorized access.');
                error.status = 401;
                throw error;
            }
    
            // if above checks pass then proceed to delete the post
    
            else{

                // query the database for the post with given id

                Post.findById(post_id).then(post => {

                    // check if the post with given id exists or not
    
                    if(!post){
                        let error = new Error('Post does not exist!');
                        error.status = 404;
                        throw error;
                    }

                    // if the post exists add the comment to the post

                    else{

                        // append comment to the post
                        post.comments.push(comment_data);

                        // save the post

                        post.save().then(result => {

                            // send response for the request
                
                            res.status(200).json({message: "Comment posted successfully!"});
                        }).catch(err => {
                            throw err;
                        });
                    }
                }).catch(err => {
                    throw err;
                });
            }
        }).catch(err => {
            throw err;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not post the comment!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// get comments belonging to a post in a classroom created by the user

exports.getComments = (req, res, next) => {
    try{

        // extract relevant data from the request object

        let fac_id = req.fac._id;
        let class_id = req.params.class_id;
        let post_id = req.params.post_id;
        let comment_info = req.body;

        // parsing comment data into an object

        const fac_info = req.fac.personal_info;

        let author = fac_info.first_name + (fac_info.last_name ? (' ' + fac_info.last_name) : '');
        const comment_data = {
            comment: comment_info.comment,
            author: author
        };

        Classroom.findById(class_id).then(classroom => {

            // check if the classroom with given id exists or not
    
            if(!classroom){
                let error = new Error('Classroom does not exist.');
                error.status = 404;
                throw error;
            }
    
            // check if the currently logged in user created the classroom
    
            else if(classroom.faculty.toString() !== fac_id.toString()){
                let error = new Error('Unauthorized access.');
                error.status = 401;
                throw error;
            }
    
            // if above checks pass then proceed to delete the post
    
            else{

                // query the database for the post with given id

                Post.findById(post_id).then(post => {

                    // check if the post with given id exists or not
    
                    if(!post){
                        let error = new Error('Post does not exist!');
                        error.status = 404;
                        throw error;
                    }

                    // if the post exists add the comment to the post

                    else{

                        // send response for the request

                        res.status(200).json(post.comments.reverse());                        
                    }
                }).catch(err => {
                    throw err;
                });
            }
        }).catch(err => {
            throw err;
        });
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not post the comment!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};