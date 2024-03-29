import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default class BirthdayPicker extends React.Component {
  static defaultProps = {
    selectedYear: new Date().getFullYear(), // Year to initialize the picker to (set to 0 to not have a year)
    selectedMonth: new Date().getMonth(), // Month to initialize the picker to
    selectedDay: new Date().getDate(), // Day to initailize the picker to
    yearsBack: 100, // How many years backwards (from starting year) you want to show

    onYearValueChange: function (year, idx) {}, // Function called when year changes
    onMonthValueChange: function (month, idx) {}, // Function called when month changes
    onDayValueChange: function (day, idx) {}, // Function called when day changes
  };

  constructor(props) {
    super(props);

    this.startingYear = this.props.selectedYear;
    this.state = {
      year: this.props.selectedYear,
      month: this.props.selectedMonth,
      day: this.props.selectedDay,
    };
  }

  getDerivedStateFromProp(nextProps) {
    this.setState({
      year: nextProps.selectedYear,
      month: nextProps.selectedMonth,
      day: nextProps.selectedDay,
    });
  }

  // Tries to get the browser locale...
  getLocale() {
    if (navigator.language) {
      return navigator.language;
    }
    if (navigator.languages && navigator.languages.length > 0) {
      return navigator.languages[0];
    }
    return "en-us"; // Default to English
  }

  // Loops through the months and gets the long name string...
  getMonthNames() {
    var monthNames = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    return monthNames;
  }

  // Returns the number of days in the given month...
  getNumDaysInMonth(year, month) {
    // February is the only month that can change, so if there's no year, assume it has the maximum (29) days...
    return year == 0 && month == 1
      ? 29
      : new Date(year, month + 1, 0).getDate();
  }

  // Returns the <Picker.Item> values for the years...
  renderYearPickerItems() {
    // If year was 0, change it to current...
    var currentYear = new Date().getFullYear();
    var centerYear = this.startingYear;
    if (centerYear === 0) {
      centerYear = currentYear;
    }

    // Set starting and ending years...
    var startYear = centerYear - this.props.yearsBack;
    var endYear = currentYear;

    var years = [];
    for (var i = startYear; i <= endYear; i++) {
      years.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    years.push(<Picker.Item label="----" value={0} key={0} />);
    return years;
  }

  // Returns the <Picker.Item> values for the months...
  renderMonthPickerItems() {
    var months = this.getMonthNames();
    return months.map(function (month, index) {
      return <Picker.Item label={month} value={index} key={index} />;
    });
  }

  // Returns the <Picker.Item> values for the days (based on current month/year)...
  renderDayPickerItems() {
    // February is the only day that can change, so if there's no year, assume it has the maximum (29) days...
    var numDays = this.getNumDaysInMonth(this.state.year, this.state.month);

    var days = [];
    for (var i = 1; i <= numDays; i++) {
      days.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    return days;
  }

  // Occurs when year value changes...
  onYearChange = (value, index) => {
    // Check if days are valid...
    var maxDays = this.getNumDaysInMonth(value, this.state.month);
    var day = this.state.day > maxDays ? maxDays : this.state.day;

    this.setState({ year: value, day: day });
    this.props.onYearValueChange(value, index);
  };

  // Occurs when month value changes...
  onMonthChange = (value, index) => {
    // Check if days are valid...
    var maxDays = this.getNumDaysInMonth(this.state.year, value);
    var day = this.state.day > maxDays ? maxDays : this.state.day;

    this.setState({ month: value, day: day });
    this.props.onMonthValueChange(value, index);
  };

  // Occurs when day value changes...
  onDayChange = (value, index) => {
    this.setState({ day: value });
    this.props.onDayValueChange(value, index);
  };

  render() {
    return (
      <View style={styles.container}>
        <Picker
          itemStyle={{ height: 50 }}
          style={styles.dayPicker}
          selectedValue={this.state.day}
          onValueChange={this.onDayChange}
        >
          {this.renderDayPickerItems()}
        </Picker>

        <Picker
          itemStyle={{ height: 50 }}
          style={styles.monthPicker}
          selectedValue={this.state.month}
          onValueChange={this.onMonthChange}
        >
          {this.renderMonthPickerItems()}
        </Picker>

        <Picker
          itemStyle={{ height: 50 }}
          style={styles.yearPicker}
          selectedValue={this.state.year}
          onValueChange={this.onYearChange}
        >
          {this.renderYearPickerItems()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dayPicker: {
    flex: 1.2,
  },
  monthPicker: {
    flex: 1.5,
  },

  yearPicker: {
    flex: 1.7,
  },
});
