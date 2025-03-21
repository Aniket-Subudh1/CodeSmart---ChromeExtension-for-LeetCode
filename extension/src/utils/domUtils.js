export function injectSidebar(url) {
    try {
      const sidebar = document.createElement("iframe");
      sidebar.src = url;
      sidebar.style.position = "fixed";
      sidebar.style.right = "0";
      sidebar.style.top = "0";
      sidebar.style.width = "300px";
      sidebar.style.height = "100%";
      sidebar.style.border = "none";
      sidebar.style.zIndex = "1000";
      sidebar.style.boxShadow = "-2px 0 5px rgba(0,0,0,0.2)";
      document.body.appendChild(sidebar);
      console.log("Sidebar injected successfully:", url);
    } catch (error) {
      console.error("Error injecting sidebar:", error);
    }
  }