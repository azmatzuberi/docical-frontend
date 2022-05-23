<template>
  <section>
    <NavBar page="start-screen" />
    <section class="open-docs-main">
      <div class="container">
        <div class="columns column is-multiline">
          <div class="column is-3-desktop">
            <SideBar />
          </div>
          <div class="column is-9-desktop is-8-tablet filters-and-switches">
            <b-field label="Turn on list view">
              <b-switch
                :rounded="false"
                :outlined="true"
                type="is-primary"
                :left-label="true"
                >List View</b-switch
              >
            </b-field>
            <b-field label="Search" class="search">
              <b-input placeholder="Search through docs" rounded></b-input>
            </b-field>
            <div>Total documents: {{ this.emails.length }}</div>
          </div>
        </div>
        <section class="columns is-multiline">
          <div
            class="document-list column is-4-desktop is-half-tablet"
            v-for="(email, index) in paginatedItems"
            :key="index"
          >
            <Email
              class="column"
              :email="email"
              :index="(index - emails.length) * -1"
            />
          </div>
        </section>
      </div>
      <section class="pagination-list columns">
        <div class="column">
          <b-pagination
            v-if="emails.length > 10"
            :total="emails.length"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :page-input="hasInput"
            :page-input-position="inputPosition"
            :debounce-page-input="inputDebounce"
          >
          </b-pagination>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Email from "@/components/open-email/Email.vue";
import Upload from "@/components/open-document/Upload.vue";
import FilesTable from "@/components/open-document/FilesTable.vue";
import Collaborate from "~/components/create-document/Collaborate.vue";
export default {
  middleware: "auth",
  name: "OpenEmail",
  components: {
    NavBar,
    SideBar,
    FilesTable,
    Email,
    Upload,
    Collaborate,
  },
  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      selected: null,
      emails: [],
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "",
      size: "",
      isSimple: false,
      isRounded: false,
      hasInput: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      inputPosition: "",
      inputDebounce: "",
    };
  },
  computed: {
    paginatedItems() {
      const pageNumber = this.current - 1;
      if (this.emails.length > 0) {
        return this.emails.slice(
          pageNumber * this.perPage,
          (pageNumber + 1) * this.perPage
        );
      }
      return null;
    },
  },
  mounted() {
    this.getEmails();
  },
  methods: {
    async getEmails() {
      this.emails = await this.$axios.$get(
        `${this.$config.app.backend_URL}/api/emails/${this.$auth.user._id}`
      );
      this.emails.reverse();
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-main {
  .columns {
    padding-right: 0;
    margin-right: 0;
    padding-left: 0;
    margin-left: 0;
  }
  .profile-page {
    margin-top: 13px;
    .version-column {
      margin-top: 10px;
    }
    .document-name {
      font-size: 1.5rem;
      font-weight: 600;
    }
    .document-size {
      font-size: 1rem;
    }
    .tag {
      margin: 0 5px;
    }
  }
  .document-column {
    div {
      // margin: 10px 0;
    }
  }
  .emails-section {
    // background-color: #f46524;
  }
}
</style>
<style lang="scss">
//* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: "";
  position: absolute;
  width: 2px;
  background-color: lightgrey;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.version-column {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.version-column::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -11px;
  background-color: #1c71e8;
  top: 20px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the version-column.version-column to the left */
.left {
  left: 0;
}

/* Place the version-column.version-column to the right */
.right {
  left: 50%;
}

/* Add arrows to the left version-column.version-column (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid grey;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent grey;
}

/* Add arrows to the right version-column.version-column (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid grey;
  border-width: 10px 10px 10px 0;
  border-color: transparent grey transparent transparent;
}

/* Fix the circle for version-column.version-columns on the right side */
.right::after {
  left: -14px;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

  /* Full-width version-column.version-columns */
  .version-column {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .version-column::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent grey transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after,
  .right::after {
    left: 21px;
  }

  /* Make all right version-column.version-columns behave like the left ones */
  .right {
    left: 0%;
  }

  .version-column::after {
    width: 15px;
    height: 15px;
    top: 25px;
  }
}
</style>
