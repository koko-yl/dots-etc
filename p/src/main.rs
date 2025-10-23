mod util;

use std::{env, iter::Peekable};

use util::git_branch;

use git2::Repository;

fn esc(s: &str) -> String {
    format!("%{{\x1b[{}m%}}", s)
}
fn gen_color(r: u8, g: u8, b: u8, gnd: Ground) -> String {
    esc(format!(
        "{}8;2;{};{};{}",
        match gnd {
            Ground::Fore => 3,
            Ground::Back => 4,
        },
        r,
        g,
        b
    )
    .as_str())
}
fn get_color(chr: &str, gnd: Ground) -> String {
    match chr {
        "B" => gen_color(99, 147, 214, gnd),
        "w" => gen_color(255, 255, 255, gnd),
        "p" => gen_color(255, 225, 235, gnd),
        "h" => gen_color(209, 54, 191, gnd),
        "r" => gen_color(250, 0, 0, gnd),
        "g" => gen_color(0, 250, 0, gnd),
        "P" => gen_color(158, 43, 209, gnd),
        "b" => gen_color(81, 145, 197, gnd),
        "l" => gen_color(215, 255, 255, gnd),
        "L" => gen_color(148, 210, 226, gnd),
        "y" => gen_color(255, 255, 0, gnd),
        _ => String::new(),
    }
}
enum Ground {
    Fore,
    Back,
}
// fn color_from_iter(iter: Peekable<std::str::Split<'_, &str>>, gnd: Ground) -> String {
fn color_from_iter<'a, I>(iter: &mut Peekable<I>, gnd: Ground) -> String
where
    I: Iterator<Item = &'a str>,
{
    let next = iter.next().unwrap();
    if "1234567890".contains(next) {
        let mut r = String::new();
        r.push_str(next);
        while "1234567890".contains(iter.peek().cloned().unwrap()) {
            r.push_str(iter.next().unwrap());
        }
        let _ = iter.next();
        let mut g = String::new();
        while "1234567890".contains(iter.peek().cloned().unwrap()) {
            g.push_str(iter.next().unwrap());
        }
        let _ = iter.next();
        let mut b = String::new();
        while "1234567890".contains(iter.peek().cloned().unwrap()) {
            b.push_str(iter.next().unwrap());
        }
        if iter.peek().cloned().unwrap() == ";" {
            let _ = iter.next();
        }
        gen_color(
            r.parse::<u8>().unwrap(),
            g.parse::<u8>().unwrap(),
            b.parse::<u8>().unwrap(),
            gnd,
        )

        // }
    } else {
        get_color(next, gnd)
    }
}
fn interp(string: &str) -> String {
    let mut out = String::new();
    let mut iter = string.split("").peekable();
    while let Some(chr) = iter.next() {
        if chr == "$" {
            match iter.next().unwrap() {
                "u" => out.push_str(env::var("USER").unwrap().as_str()),
                "r" => out.push_str(esc("0").as_str()),
                "1" => out.push_str(esc("1").as_str()),
                "$" => out.push_str("$"),
                ">" => out.push_str("\u{e0b0}"),
                "<" => out.push_str("\u{e0d7}"),
                "y" => out.push_str("\u{e725}"),
                "a" => out.push_str("\u{276f}"),
                "d" => out.push_str("\u{2570}\u{2500}"),
                "f" => out.push_str(color_from_iter(&mut iter, Ground::Fore).as_str()),
                "b" => out.push_str(color_from_iter(&mut iter, Ground::Back).as_str()),
                _ => {}
            }
        } else {
            out.push_str(chr);
        }
    }
    out
}
fn parse_path() -> String {
    let mut path = String::new();
    let binding = std::env::current_dir().unwrap();
    let buf = binding.to_str().unwrap();
    let home = buf.starts_with(env::var("HOME").unwrap().as_str());
    let mut cwd = buf.split("/").peekable();
    if home {
        let _ = cwd.next();
        let _ = cwd.next();
        let _ = cwd.next();
        path.push_str("$fP$1~$fb/$r$fl");
    }
    while let Some(p) = cwd.next() {
        path.push_str(p);
        if cwd.peek().is_some() {
            path.push_str("$fb$1/$r$fl");
        }
    }
    path
}
macro_rules! whl {
    ($freq:expr, $idx:expr, $ofs:expr) => {
        std::cmp::min(((-$freq * $idx as f32 + $ofs as f32).cos() * 127.0 + 160.0) as usize, 255)
    };
}
fn rain_ize(s: &str) -> String {
    let mut buf = String::new();
    let mut chars = s.chars();
    let n = 10;
    let freq = (3.141592 * 2.0) / n as f32;
    for i in 0..s.len() {
        let idx = i % n;
        buf.push_str(
            format!(
                "$f{};{};{};{}$r",
                whl!(freq, idx, 0),
                whl!(freq, idx, 2),
                whl!(freq, idx, 4),
                chars.next().unwrap()
            )
            .as_str(),
        );
    }
    buf
}
fn parse_git() -> String {
    match git_branch() {
        Some(s) => format!("$fB$1>>$r $fl$y$r {}", rain_ize(s.trim())),
        None => String::new(),
    }
}
fn main() {
    
    // let repo = Repository::open(".").unwrap();
    // let head = match repo.head() {
        //     Ok(h) => Some(h),
        //     Err(_) => None
        // };
        // let binding = repo.head();
        // let x = binding.as_ref().and_then(|h| Ok(h.shorthand()));
        // println!("{}", x.unwrap().unwrap());
        // println!("got here");
    // let h = head.as_ref().and_then(|h| h.shorthand());
    // println!("{}", match Repository::open(".") { 
    //     Ok(a) => "ok",
    //     Err(_) => "none"
    // });

    let status_str = match env::var("Q") {
        Ok(v) => match v.as_str() {
            "0" => "$fg",
            _ => "$fr",
        },
        Err(_) => "$fw",
    };
    print!(
        "{}",
        interp(
            format!(
                "{}$<$bB$>$r$bB$1$u$r$fB$>$r {}$r {}\n$fb>$fL>$fl> ",
                status_str,
                parse_path(),
                parse_git()
            )
            .as_str()
        )
    )
}
