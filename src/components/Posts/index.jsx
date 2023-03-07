import { PostCard } from "../PostCard"
import './styles.css'

export const Posts = ({posts}) => (
    <div className='posts'>
    {posts.map(post => (
      // abaixo veremos um componente que sera responsavel pela construção do card
      // no component passaremos as props da api que queremos ter acesso no component 
     <PostCard  
     key={post.id}
     title={post.title}
     id={post.id}
     cover={post.cover}
     body={post.body}
     />
    ))}
  </div>
)

