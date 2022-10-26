import React from 'react';
import Member from './Member';

const images_api= "https://image.tmdb.org/t/p/w1280";

const Movie = ({adult, backdrop_path, genres, homepage, spoken_languages, overview, poster_path, tagline, vote_average, status, budget, imdb_id, title, release_date, revenue, runtime, team, videos}) => {

  let video_key = null;
  if(videos){
    for(let i = 0; i < videos.results.length; i += 1){
      if(videos.results[i].name.includes("Trailer")){
        video_key=videos.results[i].key;
        break;
      }
    }
    if(!video_key){
      for(let i = 0; i < videos.results.length; i += 1){
        if(videos.results[i].name.includes("Teaser")){
          video_key=videos.results[i].key;
          break;
        }
      }
    }
    if(!video_key){
      for(let i = 0; i < videos.results.length; i += 1){
        if(videos.results[i].name.includes("Spot")){
          video_key=videos.results[i].key;
          break;
        }
      }
    }
    if(!video_key){
      for(let i = 0; i < videos.results.length; i += 1){
        if(videos.results[i].name.includes("Promo")){
          video_key=videos.results[i].key;
          break;
        }
      }
    }
  }

  return (
    <>
    <img className='backdrop_image' src={backdrop_path?images_api+backdrop_path:"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} />

    <div className="details-header">
      <div className="details-header-text">
        <a className="item name text-animation" href={homepage} target="blank">{title}</a>
        <div className="item tagline">{tagline}</div>
        <div className="item type">Movie</div>
      </div>
      <div className="details-header-video">
        {video_key && 
          <iframe className="item video" 
          src={`https://www.youtube.com/embed/${video_key}?autoplay=1&mute=1&playlist=${video_key}&loop=1`}>
          </iframe>
        }
      </div>
    </div>

    <div className="details-modal">
      
    
      <div className="details-modal-header">
        <div className="item name">{title}</div>
        <img className='item poster' height="200px" width="133px" src={backdrop_path?images_api+poster_path:"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} />
        {tagline && <div className="item tagline">{`" ${tagline} "`}</div>}
      </div>
    
      <div className="details-modal-bar">
        <div className="item rating">Rating: {vote_average}</div>
        <div className="item adult">Adult: {adult?'true':'false'}</div>
        <div className="item imdb_id">IMDB id: {imdb_id}</div>
      </div>
    
      <div className="details-modal-description">
        
        <div className="description-overview">
          <div className="item overview">
            <span className="label">Overview:</span>
            <span className="value"> {overview}</span>
          </div>
          <div className="item genres">
            <span className="label">Genres:</span> 
            {genres && genres.map((genre, index)=>{
              return <span key={index} className="value"> {genre.name} </span>;
            })}
          </div>
        </div>

        <div className="description-trivial">
          <div className="item spoken-languages">
            <span className="label">Spoken Languages:</span>
            {spoken_languages && spoken_languages.map((language, index)=>{
              return <span className="value" key={index}> {language.english_name} </span>;
            })}
          </div>
          <div className="item status">
            <span className="label">Status:</span>
            <span className="value"> {status}</span>
          </div>
          <div className="item release-date ">
            <span className="label">Release Date:</span>
            <span className="value"> {release_date}</span>
          </div>
          <div className="item budget">
            <span className="label">Budget:</span>
            <span className="value"> {budget?budget.toLocaleString():budget}</span>
          </div>
          <div className="item revenue">
            <span className="label">Revenue:</span>
            <span className="value"> {revenue?revenue.toLocaleString():revenue}</span>
          </div>
          <div className="item runtime">
            <span className="label">Runtime:</span>
            <span className="value"> {runtime}</span>
          </div>
          <a href={homepage} target="blank" className="item homepage text-animation">Visit</a>
        </div>
      
      </div>

      <div className="details-modal-cast-and-crew">
        <div className="item-heading text-animation">Cast and Crew</div>
        <div className="item cast">
          <div className="heading text-animation">Cast</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.known_for_department==="Acting" && member.character) && 
                <Member key={member.credit_id} name={member.name} image={member.profile_path} role={member.character}/>
              );
            })}
          </div>
        </div>
        <div className="item directors">
          <div className="heading text-animation">Director(s)</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.job==="Director" || member.department==="Directing") && 
                <Member key={member.credit_id} name={member.name} role={member.job} image={member.profile_path}/>
              );
            })}
          </div>
        </div>
        <div className="item producers">
          <div className="heading text-animation">Producer(s)</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.job && member.job.includes("Producer")) && 
                <Member key={member.credit_id} name={member.name} role={member.job} image={member.profile_path}/>
              );
            })}
          </div>
        </div>
        <div className="item writers">
          <div className="heading text-animation">Writer(s)</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.department==="Writing") && 
                <Member key={member.credit_id} name={member.name} role={member.job} image={member.profile_path}/>
              );
            })}
          </div>
        </div>
      </div>
    
    </div>
    </>
  )
}

export default Movie