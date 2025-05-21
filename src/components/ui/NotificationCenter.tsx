import { useNotification } from "@/contexts/NotificationContext";

export default function NotificationCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}> 
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No notifications</div>
          ) : (
            notifications.slice().reverse().map((notif) => (
              <div key={notif.id} className="border rounded-lg p-3 relative bg-gray-50">
                <div className="font-medium">{notif.title}</div>
                <div className="text-sm text-gray-700">{notif.body}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(notif.timestamp).toLocaleString()}
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
                  onClick={() => removeNotification(notif.id)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <button
            className="mt-6 w-full py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm"
            onClick={() => notifications.forEach(n => removeNotification(n.id))}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
} 