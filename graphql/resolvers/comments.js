const Post = require('../../modals/Post')
const checkAuth = require('../../util/check-auth')
const { UserInputError, AuthenticationError } = require('apollo-server')

module.exports = {
    Mutation: {
        createComment: async (parent, { postId, body }, context) => {
            const { username } = checkAuth(context)

            if(body.trim() === ""){
                throw new UserInputError('Empty Comment', {
                    errors: {
                        body: 'Comment must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId)
        

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })

                await post.save()
                return post
            } else throw new UserInputError('Post not found')
        },

        deleteComment: async (parent, { postId, commentId }, context) => {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if(post){
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId)

                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                }else{
                    throw new AuthenticationError('Action not allowed')
                }
            }else{
                throw new UserInputError('Post not found')
            }
        } 
    }
}