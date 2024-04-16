GRAPHQL PLAYGROUND COMMANDS FOR TEST

# mutation myFirstCreateTag {
#    createTag(name: "money") {
#     id
#     name
#   }
# }

# mutation {
#   createPost(newPost: {title: "최고의 요리법", content: "여기 몇 가지 훌륭한 요리법이 있습니다...", tagId: "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5"}) {
#     id
#     title
#     content
#     tag {
#       id
#       name
#     }
#   }
# }

# query {
#   getPostsByTag(tagId: "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5") {
#     id
#     title
#     content
#     tag {
#       id
#       name
#     }
#   }
# }

# query {
#   getTags {
#     id
#     name
#   }
# }

//DELETE

mutation DeletePost {
  deletePost(id: "c6ae2755-618b-401e-ba27-749dc951522f" ) {
    id
    title
    content
  }
}

//CREATE POST

mutation MyFirstMutation {
	createPost(newPost: {
    title:"Vancouver Sushi",
		content: "Miku Sushi is great"
  }) { title }
}

//FIND POST WITH STRING

query GetPostsByTitle {
  getPostByTitle(title: "Vancouver") {
    id
    title
    content
  }
}

//UPDATE POST

mutation {
  updatePost(id: "4ee1bd57-4375-4a68-a6a8-85865ec83aed", changes: {title: "updated Vancouver Sushi", content: "Suhi california is great"}) {
    id
    title
    content
  }
}
