use std::fs;
pub fn git_branch() ->  Option<String> {
    if !fs::exists(".git").unwrap() { None }
    else if !fs::metadata(".git").unwrap().is_dir() { None } 
    else {
        let head = fs::read_to_string(".git/HEAD").unwrap();
        Some(head.split("/").last().unwrap().to_string())
    }
}