export default function EditMainPage() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#111',
      }}
    >
      <iframe
        src="/editor.html"
        title="Edit Main"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          background: '#fff',
        }}
      />
    </main>
  );
}