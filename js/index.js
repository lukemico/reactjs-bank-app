var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Application = function (_React$Component) {_inherits(Application, _React$Component);

  function Application(props) {_classCallCheck(this, Application);


    //Initializing State
    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));_this.state = {
      route: "contact",
      fromAccount: 0,
      toAccount: 0,
      transferType: "",
      ammount: 0,
      memo: {
        text: "",
        len: 0 },

      fromAccounts: [
      { "id": "154", "amount": 1212.0, "name": "Jimmy's Account" },
      { "id": "164", "amount": 1412.0, "name": "Account 1" },
      { "id": "174", "amount": 1612.0, "name": "Account 2" },
      { "id": "184", "amount": 1812.0, "name": "Account 3" },
      { "id": "194", "amount": 1912.0, "name": "Account 4" },
      { "id": "204", "amount": 2012.0, "name": "Account 5" }],

      toAccounts: [
      { "id": "164", "amount": 1412.0, "name": "Account 1" },
      { "id": "174", "amount": 1612.0, "name": "Account 2" },
      { "id": "184", "amount": 1812.0, "name": "Account 3" },
      { "id": "194", "amount": 1912.0, "name": "Account 4" },
      { "id": "204", "amount": 2012.0, "name": "Account 5" }],

      startDate: _this.getToday(),
      endDate: null,
      frequency: null,
      modal: false,
      form: [],
      errors: [] };return _this;

  }

  //Helper Functions
  _createClass(Application, [{ key: "changeFrom", value: function changeFrom(event) {
      var fromAccount = event.target.value;
      var toAccounts = [].concat(_toConsumableArray(this.state.fromAccounts));
      toAccounts = _.without(toAccounts, _.find(toAccounts, ["id", fromAccount]));
      var toAccount = fromAccount === this.state.toAccount ? 0 : this.state.toAccount;
      this.setState({ fromAccount: fromAccount, toAccounts: toAccounts, toAccount: toAccount });
    } }, { key: "changeTo", value: function changeTo(
    event) {this.setState({ toAccount: event.target.value });} }, { key: "changeAmmount", value: function changeAmmount(
    event) {this.setState({ ammount: event.target.value });} }, { key: "changeMemo", value: function changeMemo(
    event) {this.setState({ memo: { text: event.target.value, len: event.target.value.length } });} }, { key: "changeTransfer", value: function changeTransfer(
    event) {this.setState({ transferType: event.target.value, endDate: null, frequency: null });} }, { key: "changeFrequency", value: function changeFrequency(
    event) {this.setState({ frequency: event.target.value });} }, { key: "changeStartDate", value: function changeStartDate(
    event) {this.setState({ startDate: event.target.value });} }, { key: "changeEndDate", value: function changeEndDate(
    event) {this.setState({ endDate: event.target.value });} }, { key: "showModal", value: function showModal(
    modal) {this.setState({ modal: modal });} }, { key: "confirmSubmit", value: function confirmSubmit()
    {this.setState({ modal: false, route: "confirm" });} }, { key: "restart", value: function restart()
    {this.setState({
        route: "form",
        fromAccount: 0,
        toAccount: 0,
        transferType: "",
        ammount: 0,
        memo: {
          text: "",
          len: 0 },

        startDate: this.getToday(),
        endDate: null,
        frequency: null,
        modal: false,
        form: [],
        errors: [] });
    } }, { key: "setRoute", value: function setRoute(
    route) {this.setState({ route: route });} }, { key: "validate", value: function validate()

    {
      var errors = {};
      var valid = true;
      if (!this.state.fromAccount) errors.fromAccount = "From Account Field is Required";
      if (!this.state.toAccount) errors.toAccount = "To Account Field is Required";
      if (!this.state.startDate) errors.startDate = "From Account Field is Required";
      if (!this.state.ammount) errors.ammount = "Ammount Field is Required";
      if (!this.state.transferType) {
        errors.transferType = "Transfer Type Field is Required";
      } else if (this.state.transferType === "Automatic Transfer") {
        if (!this.state.endDate) errors.endDate = "End Date Field is Required";
        if (!this.state.frequency) errors.frequency = "Frequency Field is Required";
      }

      if (Object.getOwnPropertyNames(errors).length > 0) valid = false;
      this.setState({ errors: errors });
      console.log(errors);
      return valid;
    } }, { key: "getToday", value: function getToday()

    {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      today = yyyy + '-' + mm + '-' + dd;

      return today;
    }

    //Handle Form Submitting
  }, { key: "handleSubmit", value: function handleSubmit(event) {
      event.preventDefault();
      if (!this.validate()) return;
      this.setState({
        modal: true,
        form: [
        { "From Account": this.state.fromAccount },
        { "To Account": this.state.toAccount },
        { "Transfer Type": this.state.transferType },
        { "Date": this.state.startDate },
        { "End Date": this.state.endDate },
        { "Frequency": this.state.frequency },
        { "Ammount": "$" + this.state.ammount },
        { "Memo": this.state.memo.text }] });


    }

    //Helper Render Function
  }, { key: "showHiddenFields", value: function showHiddenFields(radio) {
      if (radio === "One Time Transfer") {
        return (
          React.createElement("fieldset", { className: this.state.errors.startDate ? "error" : "" },
            React.createElement("label", { className: "main-label" }, "Transfer Date"),
            React.createElement("input", { type: "date", value: this.state.startDate, onChange: this.changeStartDate.bind(this) }),
            React.createElement("i", { className: "fa fa-calendar fa-fw" })));


      } else if (radio === "Automatic Transfer") {
        return (
          React.createElement(HiddenFields, { startDate: this.state.startDate, endDate: this.state.endDate, frequency: this.state.frequency,
            changeStartDate: this.changeStartDate.bind(this),
            changeEndDate: this.changeEndDate.bind(this),
            changeFrequency: this.changeFrequency.bind(this), errors: this.state.errors }));

      }
    } }, { key: "renderModal", value: function renderModal()

    {var _this2 = this;
      if (!this.state.modal) return;
      console.log("Showing Modal");
      return (
        React.createElement("div", { className: "modalWindow" },
          React.createElement("div", { className: "modal-content" },
            React.createElement("a", { href: "#", className: "close-button", onClick: function onClick() {_this2.showModal(false);} }),
            React.createElement(Verify, { form: this.state.form, showModal: this.showModal.bind(this), confirmSubmit: this.confirmSubmit.bind(this) }))));



    } }, { key: "router", value: function router(

    route) {
      if (route === "form") {
        return (
          React.createElement("div", null,
            React.createElement("h3", null, "Transfer Funds"),
            React.createElement("form", { onSubmit: this.handleSubmit.bind(this) },
              React.createElement(Select, { onChange: this.changeFrom.bind(this), account: this.state.fromAccount, title: "From account",
                css_class: this.state.errors.fromAccount ? "half-width error" : "half-width", serverResponse: this.state.fromAccounts }),
              React.createElement(Select, { onChange: this.changeTo.bind(this), account: this.state.toAccount, title: "To account",
                css_class: this.state.errors.toAccount ? "half-width right error" : "half-width right", serverResponse: this.state.toAccounts }),
              React.createElement("fieldset", { className: this.state.errors.transferType ? "half-width error" : "half-width" },
                React.createElement("label", { className: "main-label" }, "Transfer Type"),
                React.createElement("input", { type: "radio", name: "rad_transferType", id: "radTransferType_ott", value: "One Time Transfer",
                  onClick: this.changeTransfer.bind(this) }),
                React.createElement("label", { htmlFor: "radTransferType_ott" }, "One-Time Transfer"), React.createElement("br", null),
                React.createElement("input", { type: "radio", name: "rad_transferType", id: "radTransferType_at", value: "Automatic Transfer",
                  onClick: this.changeTransfer.bind(this) }),
                React.createElement("label", { htmlFor: "radTransferType_at" }, "Automatic Transfer")),

              React.createElement("fieldset", { className: this.state.errors.ammount ? "half-width right error" : "half-width right" },
                React.createElement("label", { className: "main-label" }, "Amount"),
                React.createElement("i", { className: "fa fa-dollar fa-fw" }),
                React.createElement("input", { type: "number", value: this.state.ammount, onChange: this.changeAmmount.bind(this) })),

              this.showHiddenFields(this.state.transferType),
              React.createElement(Memo, { onChange: this.changeMemo.bind(this), memo: this.state.memo, maxlen: 120 }),
              React.createElement("fieldset", { className: "button-holder" },
                React.createElement("input", { type: "button", className: "button simpleButton", value: "Cancel" }),
                React.createElement("input", { type: "submit", className: "button CTAButton", value: "Next" })))));




      } else if (route === "confirm") {
        return React.createElement(Confirm, { form: this.state.form, setRoute: this.restart.bind(this) });
      } else if (route === "profile") {
        return React.createElement(Profile, null);
      } else if (route === "home") {
        return React.createElement(Home, null);
      } else if (route === "contact") {
        return React.createElement(Contact, null);
      }
    } }, { key: "render", value: function render()

    {
      console.log(this.state);
      return (
        React.createElement("div", { className: "divMain" },
          React.createElement(Header, { setRoute: this.setRoute.bind(this) }),
          React.createElement("section", { className: "mainSection" },
            this.router(this.state.route)),

          React.createElement("input", { type: "checkbox", name: "chkOpenMenu", id: "chkOpenMenu", className: "hide" }),
          React.createElement("label", { htmlFor: "chkOpenMenu", className: "lblOpenMenu smallDisplay" },
            React.createElement("span", { className: "openItem" }),
            React.createElement("span", { className: "closeItem" })),

          React.createElement(Footer, null),
          React.createElement("input", { type: "checkbox", name: "chkShowFooter", id: "chkShowFooter", defaultChecked: "true", className: "hide" }),
          this.renderModal()));


    } }]);return Application;}(React.Component);


var Header = function Header(props) {
  return (
    React.createElement("div", null,
      React.createElement("div", { className: "btnMenu" },
        React.createElement("label", { htmlFor: "chkMenu" },
          React.createElement("i", { className: "fa fa-bars" }))),


      React.createElement("input", { type: "checkbox", id: "chkMenu" }),
      React.createElement("nav", { className: "menu" },
        React.createElement("div", { className: "title" }, "National Bank"),
        React.createElement("ul", null,
          React.createElement("li", null, React.createElement("label", { htmlFor: "chkMenu", onClick: function onClick() {return props.setRoute("profile");} }, "Transfer Activity")),
          React.createElement("li", null, React.createElement("label", { htmlFor: "chkMenu", onClick: function onClick() {return props.setRoute("form");} }, "Transactions")),
          React.createElement("li", null, React.createElement("label", { htmlFor: "chkMenu", onClick: function onClick() {return props.setRoute("contact");} }, "Contact"))))));




};

var Memo = function Memo(props) {
  return (
    React.createElement("fieldset", null,
      React.createElement("label", { className: "main-label" }, "Memo (OPTIONAL: Maximum of ", props.maxlen, " characters)"),
      React.createElement("textarea", { maxLength: props.maxlen, id: "memoText", onChange: props.onChange, value: props.memo.text }),
      React.createElement("span", null, props.maxlen - props.memo.len, " characters remaining.")));


};var

Select = function (_React$Component2) {_inherits(Select, _React$Component2);

  function Select(props) {_classCallCheck(this, Select);return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this,
    props));
  }_createClass(Select, [{ key: "componentWillMount", value: function componentWillMount()

    {
      //Load Data here!
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("fieldset", { className: this.props.css_class },
          React.createElement("label", null, this.props.title),
          React.createElement("i", { className: "fa fa-user fa-fw" }),
          React.createElement("select", { onChange: this.props.onChange, value: this.props.account },
            this.props.serverResponse.map(function (option) {
              return (
                React.createElement("option", { key: option.id, value: option.id },
                  option.name));


            }))));



    } }]);return Select;}(React.Component);


var HiddenFields = function HiddenFields(props) {
  return (
    React.createElement("div", null,
      React.createElement("fieldset", { className: props.errors.startDate ? "half-width error" : "half-width" },
        React.createElement("label", { className: "main-label" }, "Start Date"),
        React.createElement("input", { type: "date", value: props.startDate, onChange: props.changeStartDate }),
        React.createElement("i", { className: "fa fa-calendar fa-fw" })),

      React.createElement("fieldset", { className: props.errors.endDate ? "half-width right error" : "half-width right" },
        React.createElement("label", { className: "main-label" }, "End Date"),
        React.createElement("input", { type: "date", value: props.endDate, onChange: props.changeEndDate }),
        React.createElement("i", { className: "fa fa-calendar fa-fw" })),

      React.createElement("fieldset", { className: props.errors.frequency ? "error" : "" },
        React.createElement("label", { className: "main-label" }, "Frequency"),
        React.createElement("select", { value: props.frequency, onChange: props.changeFrequency },
          React.createElement("option", { value: "Weekly" }, "Weekly"),
          React.createElement("option", { value: "Bi-Monthly" }, "1st and 15th of each month"),
          React.createElement("option", { value: "Monthly" }, "Every Month"),
          React.createElement("option", { value: "Every Two Months" }, "Every Two Months")),

        React.createElement("i", { className: "fa fa-refresh fa-fw" }))));



};

var Verify = function Verify(props) {
  return (
    React.createElement("div", null,
      React.createElement("h3", null, "Please verify your data"),
      React.createElement("div", { className: "modal-body" },
        React.createElement(Summary, { form: props.form }),
        React.createElement("fieldset", { className: "button-holder" },
          React.createElement("input", { type: "button", className: "button simpleButton", value: "Previous", onClick: function onClick() {return props.showModal(false);} }),
          React.createElement("input", { type: "submit", className: "button CTAButton", value: "Submit", onClick: function onClick() {return props.confirmSubmit();} })))));




};

var Confirm = function Confirm(props) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  today = mm + '/' + dd + '/' + yyyy;
  return (
    React.createElement("div", { className: "confirm" },
      React.createElement("div", { className: "notice success" },
        React.createElement("i", { className: "fa fa-smile-o" }),
        React.createElement("p", null, "Your transfer has been successfully completed on ", today, " with confirmation number ", Math.random() * 10000000000000000)),

      React.createElement("h3", null, "Summary"),
      React.createElement(Summary, { form: props.form }),
      React.createElement("div", { className: "button-holder" },
        React.createElement("input", { type: "button", className: "button CTAButton", value: "Do Another Transaction", onClick: function onClick() {return props.setRoute("form");} }))));



};

var Summary = function Summary(props) {
  return (
    React.createElement("dl", null,
      props.form.map(
      function (field) {
        var key = Object.getOwnPropertyNames(field);
        if (!field[key[0]]) return null;
        return (
          React.createElement("div", { key: key[0] + field[key[0]] },
            React.createElement("dt", null, key[0]),
            React.createElement("dd", null, field[key[0]])));


      })));



};

var pendingData = [
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" }];


var processedData = [
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" }];


var Profile = function Profile(props) {
  return (
    React.createElement("div", { className: "transfer-activity profile" },
      React.createElement("h3", null, "Transfer Activity"),
      React.createElement("h4", null, "Pending Transfers"),
      React.createElement(SimpleTable, { data: processedData }),
      React.createElement("h4", null, "Processed Transfers"),
      React.createElement(SimpleTable, { data: pendingData })));


};var

SimpleTable = function (_React$Component3) {_inherits(SimpleTable, _React$Component3);
  function SimpleTable(props) {_classCallCheck(this, SimpleTable);var _this4 = _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).call(this,
    props));
    _this4.state = {
      header: [] };return _this4;

  }_createClass(SimpleTable, [{ key: "componentWillMount", value: function componentWillMount()

    {
      this.setState({ header: Object.getOwnPropertyNames(this.props.data[0]) });
    } }, { key: "renderHeader", value: function renderHeader(

    columns) {
      return (
        React.createElement("thead", null,
          React.createElement("tr", null,
            columns.map(function (column, index) {
              return (
                React.createElement("td", { key: index }, column));

            }))));



    } }, { key: "renderBody", value: function renderBody(

    rows, columns) {
      return (
        React.createElement("tbody", null,
          rows.map(function (row, index) {
            return (
              React.createElement("tr", { key: index },
                columns.map(function (column, innerIndex) {
                  return (
                    React.createElement("td", { key: innerIndex }, row[column]));

                })));


          })));


    } }, { key: "render", value: function render()

    {
      if (this.state.header.length === 0) return false;
      return (
        React.createElement("div", { className: "transfer-activity-table" },
          React.createElement("table", { className: "" },
            this.renderHeader(this.state.header),
            this.renderBody(this.props.data, this.state.header))));



    } }]);return SimpleTable;}(React.Component);var


GMap = function (_React$Component4) {_inherits(GMap, _React$Component4);function GMap() {var _ref;var _temp, _this5, _ret;_classCallCheck(this, GMap);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this5 = _possibleConstructorReturn(this, (_ref = GMap.__proto__ || Object.getPrototypeOf(GMap)).call.apply(_ref, [this].concat(args))), _this5), _this5.
    state = { zoom: 10 }, _temp), _possibleConstructorReturn(_this5, _ret);}_createClass(GMap, [{ key: "render", value: function render()





    {
      return React.createElement("div", { className: "GMap" },
        React.createElement("div", { className: "GMap-canvas", ref: "mapCanvas" }));


    } }, { key: "componentDidMount", value: function componentDidMount()

    {var _this6 = this;
      // create the map, marker and infoWindow after the component has
      // been rendered because we need to manipulate the DOM for Google =(
      this.map = this.createMap();
      this.marker = this.createMarker();
      this.infoWindow = this.createInfoWindow();

      // have to define google maps event listeners here too
      // because we can't add listeners on the map until its created
      google.maps.event.addListener(this.map, 'zoom_changed', function () {return _this6.handleZoomChange();});
    }

    // clean up event listeners when component unmounts
  }, { key: "componentDidUnMount", value: function componentDidUnMount() {
      google.maps.event.clearListeners(map, 'zoom_changed');
    } }, { key: "createMap", value: function createMap()

    {
      var mapOptions = {
        zoom: this.state.zoom,
        center: this.mapCenter() };

      return new google.maps.Map(this.refs.mapCanvas, mapOptions);
    } }, { key: "mapCenter", value: function mapCenter()

    {
      return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng);

    } }, { key: "createMarker", value: function createMarker()

    {
      return new google.maps.Marker({
        position: this.mapCenter(),
        map: this.map });

    } }, { key: "createInfoWindow", value: function createInfoWindow()

    {
      var contentString = "<div class='InfoWindow'>National Bank</div>";
      return new google.maps.InfoWindow({
        map: this.map,
        anchor: this.marker,
        content: contentString });

    } }, { key: "handleZoomChange", value: function handleZoomChange()

    {
      this.setState({
        zoom: this.map.getZoom() });

    } }], [{ key: "propTypes", value: function propTypes() {initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired;} }]);return GMap;}(React.Component);


var initialCenter = { lng: -103.4054536, lat: 20.6737777 };
var Contact = function Contact(props) {
  return (
    React.createElement("div", { className: "profile" },
      React.createElement("h3", null, "Contact Page"),
      React.createElement(GMap, { initialCenter: initialCenter }),
      React.createElement("ul", { className: "profile-content" },
        React.createElement("li", null,
          React.createElement("h4", null, "Phone Number"),
          React.createElement("p", null, "555-555555")),

        React.createElement("li", null,
          React.createElement("h4", null, "Email"),
          React.createElement("p", null, "national@bank.com")),

        React.createElement("li", null,
          React.createElement("h4", null, "Location"),
          React.createElement("p", null, "27 Maple Drive, Washington DC")))));




};

var Footer = function Footer(props) {
  return (
    React.createElement("footer", null,
      React.createElement("div", { className: "firstLevelFooter" }),
      React.createElement("div", { className: "secondLevelFooter" })));


};



ReactDOM.render(React.createElement(Application, null), document.getElementById('container'));