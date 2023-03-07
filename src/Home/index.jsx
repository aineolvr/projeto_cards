import {Component} from 'react';
 import './styles.css'
 import { loadPosts } from '../utils/load-posts';
import { Posts } from '../components/Posts';
import {Button} from '../components/Button/index'
import { TextInput } from '../components/TextInput';

class Home extends Component {
  state = {
    posts: [] ,
    allPosts: [] ,
    page: 0,
    postsPerPage: 5,
    searchValue: ''
  };
//invocada imediatamente apos um componente ser inserido na arvore 
  componentDidMount(){
    this.loadPosts();
  }



// utilizarei a async porque sera uma função que retornará uma promise.
  loadPosts = async () => {
    
    const {page, postsPerPage} = this.state;
    // o await ficará responsavel por esperar a promise ser resolvida e por fim executada. 
    const postsAndPhotos = await  loadPosts();
    this.setState({ 
      // logica do botão começa aqui, o slice fica responsavel por start e end, sendo assim a quantidade que 
      // sera visivel de posts na pagina. 
      posts: postsAndPhotos.slice(page, postsPerPage),
    allPosts: postsAndPhotos,
    });
  }


  // carregar mais itens na tela, logica do button 

  loadMorePosts = () => {
   const {
    page,
    postsPerPage,
    allPosts,
    posts
   } = this.state;

   
   const nextPage = page + postsPerPage;
   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
   // push: adiciona elementos ao final de um array e retorna o novo comprimento deste array 
   posts.push(...nextPosts)
  
   this.setState({posts, page: nextPage})

  }

// construção visual da pagina, interface que será vista 

handleChange = (e) => {
  const {value} = e.target;
  this.setState({ searchValue: value})
 }




  render(){
    const {posts, postsPerPage, page, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.lenght;
// primeira condição: se tem algo no searchvalue irei filtrar os posts retornando o searchvalue includes
// que digitei no input 
    const filteredPosts = !!searchValue ? 
     posts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      ); 
    })
    : posts;
    return (
      <section className='container'>
        <div className='search-container'>

           {!!searchValue && (
              <h1>Search value: {searchValue}</h1> 
           )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>

       {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}
        
        
        
       
        

        <Posts posts={posts}/>

        <div className='button-container'>
        <Button text='Load more posts'
        onClick={this.loadMorePosts}
        disabled={noMorePosts}
        />
        </div>
       
        
      </section>
     
    )
  }
}

export default Home;