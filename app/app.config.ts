export default defineAppConfig({
  ui: {
    breadcrumb: {
      variants: {
        active: {
          true: {
            link: 'text-gray-700 dark:text-gray-300 font-normal'
          }
        }
      }
    },
    chip: {
      variants: {
        size: {
          'myxl': 'h-[14px] min-w-[14px] text-[10px]'
        }
      }
    }
  }
});
