import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CityChart from '../components/CityChart.js';
import GoogleMap from '../components/GoogleMap.js';

class WeatherList extends Component {

  constructor(props) {
    super(props);

    this.renderWeather = this.renderWeather.bind(this);
  }

  mapStateToProps({weather}) {
    return {
      weather
    };
  }

  getDays(list) {
    if (!(list && list.length)) {
      return [];
    }
    var currentDate = null;
    const days = _.transform(list, (result, data) => {
      var date = data.dt_txt.split(' ')[0];
      // only collect new days
      if (date !== currentDate) {
        result.push(data);
        currentDate = date;
        // days complete, bail
        if (result.length > 4) {
          return false;
        }
      }
    });
    return days;
  }

  renderWeather(cityData) {
    // @todo cityData.list.map, .main
    const days = this.getDays(cityData.list);
    const temp = days.map(data => {
      return data.main.temp;
    });
    const pressure = days.map(data => {
      return data.main.pressure;
    });
    const humidity = days.map(data => {
      return data.main.humidity;
    });
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={cityData.city.id}>
        <td>
          <GoogleMap lng={lon} lat={lat} />
        </td>
        <td>
          <CityChart data={temp} color="red" unit="K" />
        </td>
        <td>
          <CityChart data={pressure} color="blue" unit="hPa" />
        </td>
        <td>
          <CityChart data={humidity} color="green" unit="%" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>

    );
  }
}

export default connect(WeatherList.prototype.mapStateToProps)(WeatherList);