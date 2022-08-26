import React from 'react'
import PostForm from '../../../components/form/post-form'

const PostEdit = () => {
  return (
    <div className="container">
      <PostForm isEditMode={true} />
    </div>
  )
}

export default PostEdit
