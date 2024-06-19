import React from 'react'
import trash from '../../assets/TrashBinTrash.svg'
import line from '../../assets/Line.svg'
import linetop from '../../assets/Linetop.svg'
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSup from "../../assets/semiSupport.svg";
import support from "../../assets/support.svg";

const Member = ({profile, id}) => {
    const decode = decode_positions(profile.command.members_game_profiles[id].positions_code);
    const [position, setPosition] = useState([]);
    
    useEffect(() => {
        for (let i = 0; i < decode.length; i++) {
          const element = decode[i];
          switch (element) {
            case 1:
              position.push(carry);
              break;
            case 2:
              position.push(mid);
              break;
            case 3:
              position.push(hard);
              break;
            case 4:
              position.push(semiSup);
              break;
            case 5:
              position.push(support);
              break;
            default:
              break;
          }
        }
      }, []);
    
      function decode_positions(code) {
        const positions = [];
        for (let i = 1; i <= 5; ++i) {
          if (code & (1 << (i - 1))) {
            positions.push(i);
          }
        }
        return positions;
      }
  
  return (
    <div className="teammates">
    <div className="teammateRank">
    <img  alt="" className="teammateRankImg"/>
    </div>
    <div className="teammateInfo">
      <div className="">
          <div className="teammateName">{profile.command.members_game_profiles[id].name} </div>
          <div className="redact"><img src={trash} alt="" /></div>
          </div>
          <img src={line} className="teammatesHr"/>
          <div className="teammeteHeroes">

            <img src={linetop} alt="" />
            {position.map((url) => (
                    <img src={url} className="teammeteHeroe"/>
                  ))}
          </div>
    </div>

</div>
  )
}

export default Member