<template>
  <section>
    <NavBar page="profile-page" />
    <section class="profile-main">
      <div class="container">
        <div class="columns profile-page column">
          <div class="column is-3-desktop">
            <SideBar />
          </div>
          <div
            v-if="document.data && show"
            class="document-column column is-one-third"
          >
            <div class="document-name">
              {{ document.data.name }}
            </div>
            {{ document.data.created }}
            <div class="document-size">Size: {{ document.data.size }}</div>
            <div class="document-category">
              Category: {{ document.data.category }}
            </div>
            <div class="document-owner">Owners: {{ document.data.owner }}</div>
            <div class="document-tags">
              Tags:
              <b-tag
                v-for="(tag, index) in document.data.tags"
                :key="index"
                type="is-info"
                >{{ tag }}</b-tag
              >
            </div>
            <div v-if="versions" class="document-versions">
              Versions: {{ versions.length }}
            </div>
            <div class="document-original">
              Original:
              <a target="blank" :href="encodeURI(document.data.originalFileUrl)"
                >View</a
              >
            </div>
          </div>
          <div v-if="show" class="upload-column column is-one-third">
            <b-field label="Upload a version of this file">
              <Upload :document="document" @reload="getVersions" />
            </b-field>
          </div>
          <section v-if="show === false">
            <div class="column">
              <h1>You don't have access to this document</h1>
            </div>
          </section>
        </div>
        <section class="columns" v-if="!collaboratorFlag && show && versions">
          <div class="column is-one-third-desktop is-half-tablet">
            <Collaborate :version="versions.data" :page="true" />
          </div>
        </section>
        <section v-if="show" class="versions-section timeline">
          <div
            class="version-column"
            :class="index % 2 !== 0 ? 'left' : 'right'"
            v-for="(version, index) in versions"
            :key="index"
          >
            <Document
              :version="version"
              :index="(index - versions.length) * -1"
            />
          </div>
        </section>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Document from "@/components/open-document/Document.vue";
import Upload from "@/components/open-document/Upload.vue";
import FilesTable from "@/components/open-document/FilesTable.vue";
import Collaborate from "~/components/create-document/Collaborate.vue";
export default {
  middleware: "auth",
  name: "DocumentProfile",
  components: {
    NavBar,
    SideBar,
    FilesTable,
    Document,
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
      hasMobileCards: true,
      selected: null,
      document: {},
      versions: [],
      collaboratorsInput: [],
      collaboratorFlag: true,
      show: null,
    };
  },
  computed: {
    collaborators: {
      get() {
        if (this.document.data) return this.document.data.collaborators;
      },
      set(values) {
        this.collaboratorsInput = values;
      },
    },
  },
  beforeMount() {
    this.getCollaborators();
  },
  methods: {
    addDocStuff(data) {
      if (data) {
        const doc = {
          collaborators: this.collaborators,
        };
        this.$store.commit("doc/add", doc);
      }
    },
    async getCollaborators() {
      await this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/collaborators/${this.$nuxt.$route.params.id}`,
          {
            user_id: this.$auth.user._id,
            doc_type: "Document",
            email: this.$auth.user.email,
          }
        )
        .then((result) => {
          if (result.status === 200 && result.flag) {
            this.collaboratorFlag = true;
            this.show = true;
          }
          if (result.status === 201 && result.flag) {
            this.collaboratorFlag = false;
            this.show = true;
          }
          this.getDocument();
          this.getVersions();
        })
        .catch(() => {
          this.show = false;
        });
    },
    async getDocument() {
      this.document = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/documents/document/${this.$nuxt.$route.params.id}`
      );
    },
    async getVersions() {
      this.versions = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/doc_versions/versions/${this.$nuxt.$route.params.id}`,
        {
          user_id: this.$auth.user._id,
        }
      );

      this.versions.reverse();
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
  .versions-section {
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
