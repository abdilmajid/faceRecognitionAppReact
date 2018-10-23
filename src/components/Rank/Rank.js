import React, {Component} from 'react';

class Rank extends Component {
  render(){
    let name = 'Guest';
    let entries = 0;
/* 
--> Bug:  when signing in the name and entries are not updated from the       database, the props are not being passed
--> Could be an async issue, code runs before getting info from database.
--> hard coded a value for name & entries.
*/
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
      </div>
    );
  }
}

export default Rank;