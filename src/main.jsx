// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
// 	<StrictMode>
// 		<AuthProvider>
// 			<RouterProvider router={router} />
// 		</AuthProvider>
// 		<Toaster />
// 	</StrictMode>
// );

createRoot(document.getElementById("root")).render(
	<>
		 <QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			<Toaster />
		</QueryClientProvider>
	</>
);
