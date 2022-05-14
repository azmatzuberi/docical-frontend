<template>
  <section class="columns comments-section is-centered is-multiline">
    <div class="column comment-board is-half">
      <div class="">
        <b-field label="Comment">
          <b-input v-model="comment" maxlength="300" type="textarea"></b-input>
        </b-field>
        <b-button @click="postComment(comment)">Post comment</b-button>
      </div>
      <div class="">
        <div
          class="column comments-posts"
          v-for="(comment, index) in comments"
          :key="index"
        >
          {{ comment }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comments",
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    postComment(comment) {
      this.comments.push(
        comment +
          "\r\n\r\n-" +
          this.$auth.user.first_name +
          " " +
          this.$auth.user.last_name
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.comments-section {
  margin-top: 20px;

  .comments-posts {
    color: black;
    margin-top: 10px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    overflow-x: auto;
    height: auto;
    word-wrap: break-word;
    white-space: pre-line;
    webkit-box-shadow: -5px 7px 5px 0px rgba(201, 193, 201, 0.6);
    -moz-box-shadow: -5px 7px 5px 0px rgba(201, 193, 201, 0.6);
    box-shadow: -5px 7px 5px 0px rgba(201, 193, 201, 0.6);
  }
  .comment-board {
    max-width: 100%;
    margin: 0uto;
  }
}
</style>
