<template>
  <section class="columns comments-section is-centered is-multiline">
    <div class="column comment-board is-half">
      <div class="column">
        <b-field label="Comment">
          <b-input v-model="comment" maxlength="300" type="textarea"></b-input>
        </b-field>
        <b-button @click="postComment(comment)">Post comment</b-button>
      </div>
      <div
        class="column comments-posts"
        v-for="(comment, index) in comments"
        :key="index"
      >
        {{ comment }}
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
      this.comments.push(comment);
    },
  },
};
</script>

<style lang="scss" scoped>
.comments-posts {
  color: #fff;
  border: #fff 1px solid;
  margin-top: 10px;
  border-radius: 5px;
  overflow-x: auto;
  height: auto;
  word-wrap: break-word;
}
.comment-board {
  max-width: 100%;
  margin: 0uto;
}
</style>
