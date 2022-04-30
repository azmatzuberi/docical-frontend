<template>
  <b-sidebar
    class="signature-side-bar column is-one-quarter-desktop is-full-tablet"
    position="static"
    :expand-on-hover="expandOnHover"
    :delay="expandWithDelay ? 500 : null"
    open
  >
    <div class="p-1">
      <b-menu class="is-custom-mobile">
        <b-menu-list label="">
          <b-menu-item expanded icon="file" label="Menu">
            <b-menu-item
              icon="folder-open-outline"
              label="Open signature file"
            ></b-menu-item>
            <b-menu-item icon="clock" label="Create time/date"></b-menu-item>
            <b-menu-item icon="text" label="Add text"></b-menu-item>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  name: "SignatureSideBar",
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
.b-sidebar {
  .sidebar-content {
    background-color: #1b72e8;
    color: #fff;
    border-radius: 5px;
    width: auto;

    a {
      color: #fff;
    }

    a:hover {
      color: black;
    }

    a.is-active {
      background-color: whitesmoke;
      color: #000;
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
}
</style>
