import { themenschwerpunktBP } from "../../constant/blueprintOptionData";
import ListBoxIcon from "../ListBoxIcon";

const OrgaIconWrapper = ({themenschwerpunkt}) => {
    return (
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-8">
            {themenschwerpunkt &&
              themenschwerpunkt.map((val, idx) => {
                return (
                  <div key={idx} className="flex gap-2 items-center">
                    <ListBoxIcon thema={val} />
                    <div className="orga_icon_text">{themenschwerpunktBP[`${val}`]}</div>
                  </div>
                );
              })}
          </div>
    )
}

export default OrgaIconWrapper;