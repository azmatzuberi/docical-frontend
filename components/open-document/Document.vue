<template>
  <section class="card">
    <header class="card-header">
      <p class="card-header-title">{{ document.name }}</p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <table class="card-table">
        <tbody>
          <tr>
            <td class="row-heading">Owner:</td>
            <td class="document-field">{{ document.owner }}</td>
          </tr>
          <tr>
            <td class="row-heading">Category:</td>
            <td class="document-field">{{ document.category }}</td>
          </tr>
          <tr>
            <td class="row-heading">Size:</td>
            <td class="document-field">{{ document.size }}</td>
          </tr>
          <tr>
            <td class="row-heading">Signees:</td>
            <td class="document-field">
              <span v-for="(signer, index) in document.signees" :key="index"
                >{{ signer }},&nbsp;</span
              >
            </td>
          </tr>
          <tr>
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
          <tr>
            <td class="row-heading">Versions:</td>
            <td class="document-field">{{ document.versions }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span> View </span>
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
  props: ["document"],
};
</script>

<style lang="scss">
.card {
  .card-header {
    height: 2.5rem;
  }
  .card-table {
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
