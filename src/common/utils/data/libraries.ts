export const getLibrarySource = (library?: string, version?: string) => {
  if (library === 'tailwindcss') {
    switch (version) {
      case '3.2.4':
        return "<script src='https://cdn.tailwindcss.com/3.2.4'></script>";
      case '2.2.19':
        return "<link rel='stylesheet' href='https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css' />";
      case '1.9.6':
        return "<link rel='stylesheet' href='https://unpkg.com/tailwindcss@1.9.6/dist/tailwind.min.css' />";
      default:
        return "<script src='https://cdn.tailwindcss.com/3.2.4'></script>";
    }
  } else if (library === 'bulma') {
    switch (version) {
      case '0.9.4':
        return "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'/>";
      default:
        return "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'/>";
    }
  } else if (library === 'bootstrap') {
    switch (version) {
      case '5.2':
        return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2/dist/css/bootstrap.min.css" rel="stylesheet"/>';
      case '4.6':
        return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"/>';
      default:
        return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2/dist/css/bootstrap.min.css" rel="stylesheet"/>';
    }
  } else return '';
};
export const useLibraryLabel = (val?: string) => {
  switch (val) {
    case 'tailwindcss':
      return 'TailwindCSS';
    case 'bulma':
      return 'Bulma';
    case 'bootstrap':
      return 'Bootstrap';
    default:
      return 'TailwindCSS';
  }
};
export const iframeSrcDoc = ({
  initialCode = '',
  library,
  version,
}: {
  initialCode?: string;
  library?: string;
  version?: string;
}) => {
  return `<html>
        <head>
        ${getLibrarySource(library, version)}
        
        <script type="module">
        window.addEventListener('message', (event) => {
            const { type, value } = event.data;

            if (type === 'html') {
            document.body.innerHTML = value;
            }
        })
        </script>
        </head>
        <body>${initialCode}</body>
    </html>`;
};
