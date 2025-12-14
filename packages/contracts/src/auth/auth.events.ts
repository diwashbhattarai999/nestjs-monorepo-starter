/**
 * Auth-related event names.
 * Defines the various events used in the Auth Service.
 */
export const AuthEvents = {
	UserCreated_V1: "auth.user.created.v1",
	UserCreated_Notification_V1: "auth.user.created.notification.v1",
	UserLoggedIn_V1: "auth.user.logged_in.v1",
} as const;

export type AuthEventName = (typeof AuthEvents)[keyof typeof AuthEvents];
