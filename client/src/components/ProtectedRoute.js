import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute(props){

    const {token, path, component: C, redirectTo, ...rest} = props
    
    return token?
                <Route path={path} render={() => <C {...rest}/> } />
                :
                <Redirect to={redirectTo} />
}