import Sp1 from "../../static/images/sp1.jpg";
import Sp2 from "../../static/images/sp2.jpg";
import Sp3 from "../../static/images/sp3.jpg";
import Sp4 from "../../static/images/sp4.jpg";
import Sp5 from "../../static/images/sp5.jpg";
import Sp6 from "../../static/images/sp6.jpg";
import Sp7 from "../../static/images/sp7.jpg";
import Sp8 from "../../static/images/sp8.jpg";
import Sp9 from "../../static/images/sp9.jpg";
import Sp10 from "../../static/images/sp10.jpg";
import Sp11 from "../../static/images/heading.jpg";

export const getWallpaper = () => {
    const wallpapers = [
      Sp1,
      Sp2,
      Sp3,
      Sp4,
      Sp5,
      Sp6,
      Sp7,
      Sp8,
      Sp9,
      Sp10,
      Sp11,
    ];
    const randomIndex = Math.round(Math.random() * 10);
    return wallpapers[randomIndex];
  };

  export const getSummary = (info, heading = []) => {
    if (info[0].length === 0) {
        return (
            <h3>No User Data Found</h3>
        )
    }
    return heading.map((header, i) => (
      <div>
        <table>
          <tbody>
            <tr className="t-row">
              <th className="tdata thead">{header}</th>
              <td className="tdata">{info[i]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ));
  };

  export const courseStatusTabs = {
    inProgress: "In Progress",
    completed: "Completed",
  };