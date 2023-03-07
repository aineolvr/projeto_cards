import './styles.css'
// irei passar na propriedade da função as props que dei acesso no component 
export const PostCard = ({cover, id, title, body}) => {
    return (
        <div className='post'>
        <img src={cover} alt={title} />
      <div  className='post-content'>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      </div>
    );
}