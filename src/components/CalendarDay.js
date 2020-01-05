import React from 'react';

class CalendarDay extends React.Component {

  showShiftsOnThisDay = (props) => {
    console.log(this.props.shiftsOfDay);
  }

  render() {
    return(
      <section>
        <h1> Calendar Day here</h1>
        {this.showShiftsOnThisDay()}
      </section>
    );
  }
}

export default CalendarDay;