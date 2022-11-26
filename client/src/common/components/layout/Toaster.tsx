import { toast, ToastBar, Toaster } from 'react-hot-toast';

function ReactToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      containerStyle={{
        zIndex: 99999999,
      }}
      toastOptions={{
        style: {
          maxWidth: 600,
          wordBreak: 'break-word',
          padding: '0.55rem 1rem',
          backdropFilter: 'blur(5px)',
        },
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
          'style': {
            margin: 0,
          },
        },
        loading: {
          style: {
            fontWeight: 400,
          },
        },
        success: {
          duration: 5500,

          style: {
            fontWeight: 400,
          },
        },
        error: {
          style: {
            fontWeight: 400,
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message, icon }) => (
            <div
              className="flex items-center justify-between w-full"
              onClick={() => toast.dismiss(t.id)}
            >
              <div className="flex items-center text-left">
                {icon}
                {message}
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default ReactToaster;
