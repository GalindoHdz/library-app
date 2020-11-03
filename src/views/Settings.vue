<template>
  <div class="dashboard_container">
    <Profile />
    <Sett />
    <Loading />
    <Message />
  </div>
</template>

<script>
import Profile from "../components/Profile";
import Sett from "../components/Sett";
import Loading from "../components/Loading";
import Message from "../components/Message";

export default {
  name: "Settings",
  components: {
    Profile,
    Sett,
    Loading,
    Message,
  },
};
</script>
