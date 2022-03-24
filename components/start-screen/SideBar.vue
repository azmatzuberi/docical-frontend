<template>
  <div
    class="sidebar-page"
    :style="[startScreen ? { 'margin-top': '13px' } : { 'margin-top': '0' }]"
  >
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :expand-on-hover="expandOnHover"
        :delay="expandWithDelay ? 500 : null"
        open
      >
        <div class="p-1">
          <b-menu class="is-custom-mobile">
            <b-menu-list label="">
              <b-menu-item expanded icon="network" label="Menu">
                <b-menu-item
                  icon="folder-plus-outline"
                  label="Create"
                  tag="router-link"
                  to="/create-document"
                ></b-menu-item>
                <b-menu-item
                  icon="folder-open-outline"
                  label="Open"
                  tag="router-link"
                  to="/open-document"
                ></b-menu-item>
              </b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ["startScreen"],
  data() {
    return {
      expandOnHover: true,
      expandWithDelay: false,
      reduce: false,
    };
  },
};
</script>

<style lang="scss">
.sidebar-page {
  .p-1 {
    padding: 1em;
  }

  li a {
    color: #fff;
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;

    .b-sidebar {
      width: 100%;
    }

    .sidebar-content {
      background-color: #1b72e8;
      color: #fff;
      border-radius: 5px;
      width: auto;
    }
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
