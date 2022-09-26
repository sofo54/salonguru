import { IUserDocument } from '../../Models/user.model';
import { ISession, LoggedUser } from '../../Types/user.type';

export const transformUserLogged = (user: IUserDocument, session: ISession): LoggedUser => {
	return {
		userID: user.id,
		identifier: user.identifier,
		session: session,
	};
};
