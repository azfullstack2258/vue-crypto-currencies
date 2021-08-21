import Vue from "vue";
import moment from "moment";

const datetime = Vue.filter("datetime", (str: string) => moment(str).format("YYYY-MM-DD hh:mm:ss"));

export default {
  datetime
};
