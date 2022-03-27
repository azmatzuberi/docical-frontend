<template>
  <section class="card">
    <header class="card-header">
      <p v-if="document" class="card-header-title">
        {{ document.name }}
      </p>
      <div v-if="version" class="card-header-title">
        <div>{{ index }}:</div>
        <div id="date">
          {{ new Date(version.created).toLocaleDateString("en-US") }}
        </div>
      </div>
    </header>
    <div class="card-content">
      <table class="card-table">
        <tbody>
          <tr v-if="document">
            <td class="row-heading">Owner:</td>
            <td class="document-field">
              {{ document.owner }}
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Category:</td>
            <td class="document-field">
              {{ document.category }}
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Size:</td>
            <td class="document-field">{{ document.size }}</td>
          </tr>
          <tr v-if="version">
            <td class="row-heading">Size:</td>
            <td class="document-field">{{ version.size }}</td>
          </tr>
          <tr>
            <td class="row-heading">Signees:</td>
            <td v-if="document" class="document-field">
              <span v-for="(signer, index) in document.signees" :key="index"
                >{{ signer }},&nbsp;</span
              >
            </td>
            <td v-if="version" class="document-field">
              <span v-for="(signer, index) in version.signees" :key="index"
                >{{ signer }},&nbsp;</span
              >
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Tags:</td>
            <td class="document-field">
              <b-taglist>
                <b-tag
                  v-for="(tag, index) in document.tags"
                  :key="index"
                  type="is-info"
                  >{{ tag }}</b-tag
                >
              </b-taglist>
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Versions:</td>
            <td class="document-field">{{ document.versions }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="card-footer">
      <p v-if="document" class="card-footer-item">
        <a :href="'/document/' + document._id"><span> Versions </span></a>
      </p>
      <p v-if="document" class="card-footer-item">
        <a target="blank" :href="encodeURI(document.originalFileUrl)"
          ><span> Original </span></a
        >
      </p>
      <p v-if="version" class="card-footer-item">
        <a target="blank" :href="version.securedFileUrl"><span> View </span></a>
      </p>
      <p class="card-footer-item">
        <span> Share</span>
      </p>
    </footer>
  </section>
</template>

<script>
export default {
  name: "DocuMent",
  props: ["document", "version", "index"],
};
</script>

<style lang="scss">
.card {
  .card-header {
    height: 2.5rem;

    .card-header-title {
      justify-content: space-between;
    }
  }
  .card-table {
    width: 100%;
    tr {
      border-bottom: 0.5px solid grey;
      td {
        padding: 5px 0;
      }
    }
    .row-heading {
      font-size: 0.8rem;
    }
    .document-field {
      text-align: right;
    }
    tr:last-child {
      border: none;
    }

    .tags {
      flex-direction: row-reverse;
      .tag {
        margin: 3px;
      }
    }
  }
}
</style>
